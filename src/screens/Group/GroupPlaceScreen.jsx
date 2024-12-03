import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import {Dimensions, FlatList, Image, StyleSheet, View, ActivityIndicator} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import GroupPlaceHeader from "../../components/group/place/GroupPlaceHeader";
import GroupPlaceCards from "../../components/group/place/GroupPlaceCards";
import {UserContext} from "../../context/UserContext";
import api from "../../api/api";

const GroupPlaceScreen = ({route, navigation}) => {
    const {groupOwnerId, groupId} = route.params;
    const {userData} = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(null);
    const mapRef = useRef(null);
    const flatListRef = useRef(null);

    // API 호출 함수
    const fetchGroupPlace = useCallback(async () => {
        try {
            setIsLoading(true); // 로딩 상태 시작
            const response = await api.get(`/group/place/${groupId}/all`, {
                params: {size: 100, page: 0},
            });

            if (response.status === 200) {
                setPlaces(response.data.content);
                console.log(response.data.content.length);
            }
        } catch (error) {
            console.error("Failed to fetch group places:", error);
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    }, [groupId]);

    // 컴포넌트 마운트 시 또는 groupId 변경 시 API 호출
    useEffect(() => {
        fetchGroupPlace();
    }, [fetchGroupPlace]);

    // 현재 위치 가져오기 및 초기화
    useEffect(() => {
        const getLocation = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("위치 권한이 거부되었습니다.");
                    navigation.goBack();
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});

                if (places.length > 0) {
                    const firstPlace = places[0];
                    setCurrentRegion({
                        latitude: firstPlace.placeLatitude,
                        longitude: firstPlace.placeLongitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                } else {
                    setCurrentRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                }
            } catch (error) {
                console.error("Failed to get location:", error);
            }
        };

        getLocation();
    }, [places, navigation]);

    // 슬라이드 변경 시 지도 이동
    const handleScroll = (event) => {
        const viewWidth = Dimensions.get("screen").width;
        const index = Math.round(event.nativeEvent.contentOffset.x / viewWidth);

        if (mapRef.current && places[index]) {
            const latitude =  places[index].placeLatitude;
            const longitude =  places[index].placeLongitude;
            mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 500);
        }
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <GroupPlaceHeader navigation={navigation} groupOwnerId={groupOwnerId}/>

            {/* 로딩 인디케이터 */}
            {isLoading && <ActivityIndicator size="large" color="#6DB777" style={styles.loading}/>}

            {/* 지도 */}
            {currentRegion && (
                <MapView ref={mapRef} style={styles.map} region={currentRegion}>
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            coordinate={{latitude: place.placeLatitude, longitude: place.placeLongitude}}
                            title={place.placeName}
                            style={styles.markerContainer}
                        >
                            <Image
                                source={require("../../assets/images/trip-marker.png")}
                                style={styles.markerImage}
                            />
                        </Marker>
                    ))}
                </MapView>
            )}

            {/* 슬라이드 */}
            <FlatList
                ref={flatListRef}
                data={places}
                renderItem={({item}) => <GroupPlaceCards item={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
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
});
