import React, {useContext, useEffect, useRef, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import {GroupPlaceContext} from "../../context/GroupPlaceContext";
import GroupPlaceHeader from "../../components/group/place/GroupPlaceHeader";
import GroupPlaceCards from "../../components/group/place/GroupPlaceCards";
import {UserContext} from "../../context/UserContext";
import api from "../../api/api";

const GroupPlaceScreen = ({route, navigation}) => {
    const {groupOwnerId, groupId} = route.params;
    const {places, isLoading, fetchGroupPlaces} = useContext(GroupPlaceContext);
    const [searchPlaces, setSearchPlaces] = useState([]); // 빈 배열로 초기화
    const [currentRegion, setCurrentRegion] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null); // 현재 위치 추가
    const mapRef = useRef(null);
    const flatListRef = useRef(null);
    const {userData} = useContext(UserContext);

    // 그룹 장소 데이터 로드
    useEffect(() => {
        if (groupId) {
            fetchGroupPlaces(groupId); // 데이터를 한 번만 로드
        }
    }, [groupId]);

    // 초기 지도 위치 설정 및 현재 위치 저장
    useEffect(() => {
        const initializeLocation = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    navigation.goBack();
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});

                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (!places || places.length === 0) {
                    setCurrentRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                } else {
                    setCurrentRegion({
                        latitude: parseFloat(places[0].latitude),
                        longitude: parseFloat(places[0].longitude),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                }
            } catch (error) {
                console.error("Failed to initialize location:", error);
            }
        };

        initializeLocation();
    }, []); // 초기화 작업만 수행

    // places 변경 시 지도 위치 업데이트
    useEffect(() => {
        if (places && places.length > 0) {
            const firstPlace = places[0];
            setCurrentRegion({
                latitude: parseFloat(firstPlace.placeLatitude),
                longitude: parseFloat(firstPlace.placeLongitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [places]); // places 변경 시만 실행

    // FlatList 스크롤 시 지도 이동
    const handleScroll = (event) => {
        const viewWidth = Dimensions.get("screen").width;
        const index = Math.round(event.nativeEvent.contentOffset.x / viewWidth);

        if (mapRef.current && places[index]) {
            mapRef.current.animateToRegion(
                {
                    latitude: parseFloat(places[index].placeLatitude),
                    longitude: parseFloat(places[index].placeLongitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                500
            );
        }
    };

    const handleCardPress = (place) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: parseFloat(place.placeLatitude),
                    longitude: parseFloat(place.placeLongitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                500
            );
        }
    };

    const goCurrentLocation = () => {
        if (currentLocation && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                500
            );
        } else {
            console.error("Current location is not available or mapRef is not initialized");
        }
    };

    const handleRegionChangeComplete = (region) => {
        setCurrentRegion(region); // 화면 중심 업데이트
        fetchPlacesInRegion(region); // 지도 경계 내 장소 가져오기
    };

    const fetchPlacesInRegion = async (region) => {
        const north = region.latitude + region.latitudeDelta / 2;
        const south = region.latitude - region.latitudeDelta / 2;
        const east = region.longitude + region.longitudeDelta / 2;
        const west = region.longitude - region.longitudeDelta / 2;

        try {
            const response = await api.get('/place/placeInRegion', {
                params: {north, south, east, west},
            });

            if (response.status !== 200) {
                console.error('Failed to fetch places in region:', response.statusText);
                setSearchPlaces([]);
                return;
            }

            const data = Array.isArray(response.data) ? response.data : [];
            setSearchPlaces(data); // 검색된 장소 업데이트
        } catch (error) {
            console.error('Error fetching places in region:', error);
            setSearchPlaces([]);
        }
    };



    return (
        <View style={styles.container}>
            <GroupPlaceHeader
                navigation={navigation}
                groupOwnerId={groupOwnerId}
                groupId={groupId}
                funcGCL={goCurrentLocation} // 현재 위치 이동
                funcHRC={fetchPlacesInRegion} // 지도 경계 내 장소 검색
            />

            {isLoading && <ActivityIndicator size="large" color="#6DB777" style={styles.loading}/>}

            {currentRegion && (
                <MapView ref={mapRef} style={styles.map} region={currentRegion}>
                    {/* 그룹 장소 마커 */}
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(place.placeLatitude),
                                longitude: parseFloat(place.placeLongitude),
                            }}
                            title={place.placeName}
                            style={styles.markerContainer}
                        >
                            <Image
                                source={require("../../assets/images/trip-marker.png")}
                                style={styles.markerImage}
                            />
                        </Marker>
                    ))}
                    {searchPlaces.map((place, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(place.latitude),
                                longitude: parseFloat(place.longitude),
                            }}
                            title={place.name}
                        />
                    ))}

                    {/* 현재 위치 마커 */}
                    {currentLocation && (
                        <Marker
                            coordinate={currentLocation}
                            title={`${userData.name}님의 위치`}
                            style={styles.myLocationBox}
                        >
                            <View style={styles.myLocation}>
                                <Image
                                    style={styles.myLocationImage}
                                    source={
                                        userData.profileImage
                                            ? {uri: userData.profileImage} // 프로필 이미지가 있을 경우
                                            : require("../../assets/images/b-p-1.png") // 기본 이미지
                                    }
                                />
                            </View>
                        </Marker>
                    )}

                </MapView>
            )}

            <FlatList
                ref={flatListRef}
                data={places}
                renderItem={({item}) => <GroupPlaceCards item={item}
                                                         onPress={() => handleCardPress(item)}/>} // 데이터를 준비된 상태로 전달
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatList}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default GroupPlaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        width: 30,
        height: 40,
    },
    markerImage: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
    },
    flatList: {
        position: "absolute",
        bottom: 60,
    },
    myLocationBox: {
        width: 25,
        height: 25,
    },
    myLocation: {
        width: 30,
        height: 30,
        borderRadius: 99,
        backgroundColor: "#6DB777",
        justifyContent: "center",
        alignItems: "center",
    },
    myLocationImage: {
        width: 20,
        height: 20,
        borderRadius: 99,
    }
});
