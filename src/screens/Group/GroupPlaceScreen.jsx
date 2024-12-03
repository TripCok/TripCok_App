import React, {useContext, useEffect, useRef, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import {GroupPlaceContext} from "../../context/GroupPlaceContext";
import GroupPlaceHeader from "../../components/group/place/GroupPlaceHeader";
import GroupPlaceCards from "../../components/group/place/GroupPlaceCards";

const GroupPlaceScreen = ({route, navigation}) => {
    const {groupOwnerId, groupId} = route.params;
    const {places, isLoading, fetchGroupPlaces} = useContext(GroupPlaceContext);
    const [currentRegion, setCurrentRegion] = useState(null);
    const mapRef = useRef(null);
    const flatListRef = useRef(null);

    // 그룹 장소 데이터 로드
    useEffect(() => {
        fetchGroupPlaces(groupId);
    }, [groupId]);

    // 초기 위치 설정
    useEffect(() => {
        const initializeLocation = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    navigation.goBack();
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const firstPlace = places[0];
                setCurrentRegion(
                    firstPlace
                        ? {
                            latitude: parseFloat(firstPlace.placeLatitude),
                            longitude: parseFloat(firstPlace.placeLongitude),
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }
                        : {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }
                );
            } catch (error) {
                console.error("Failed to initialize location:", error);
            }
        };

        initializeLocation();
    }, [places]);

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

    return (
        <View style={styles.container}>
            <GroupPlaceHeader navigation={navigation} groupOwnerId={groupOwnerId} groupId={groupId}/>

            {isLoading && <ActivityIndicator size="large" color="#6DB777" style={styles.loading}/>}

            {currentRegion && (
                <MapView ref={mapRef} style={styles.map} region={currentRegion}>
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
                </MapView>
            )}

            <FlatList
                ref={flatListRef}
                data={places}
                renderItem={({item}) => <GroupPlaceCards item={item}/>}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false} // 스크롤 표시 제거
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatList}
                onScroll={handleScroll} // 스크롤 이벤트 핸들러 추가
                scrollEventThrottle={16} // 스크롤 이벤트 발생 빈도 설정
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
