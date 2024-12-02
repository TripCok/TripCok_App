import React, { useEffect, useState, useRef, useContext } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import GroupPlaceHeader from "../../components/group/place/GroupPlaceHeader";
import GroupPlaceCards from "../../components/group/place/GroupPlaceCards";
import { UserContext } from "../../context/UserContext";

const GroupPlaceScreen = ({ route }) => {
    // Context 및 네비게이션
    const { userData } = useContext(UserContext);
    const navigation = route.params?.navigation;

    // 장소 데이터
    const items = [
        {
            name: "플레이데이터",
            image: require("../../assets/images/p-2.png"),
            order: 1,
            latitude: 37.4864987317089,
            longitude: 127.020663860591,
        },
        {
            name: "정훈이네 집",
            image: require("../../assets/images/p-3.png"),
            order: 2,
            latitude: 37.4852447288975,
            longitude: 127.021557652003,
        },
        {
            name: "망지네 집",
            image: require("../../assets/images/p-1.png"),
            order: 3,
            latitude: 37.5294607910398,
            longitude: 127.114054184816,
        },
    ];

    // 상태 및 참조
    const [currentRegion, setCurrentRegion] = useState(null);
    const mapRef = useRef(null); // MapView 참조
    const flatListRef = useRef(null); // FlatList 참조

    // 현재 위치 가져오기 및 초기화
    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("위치 권한이 거부되었습니다.");
                navigation.goBack();
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            if (items.length > 0) {
                const firstItem = items.reduce((min, item) => (item.order < min.order ? item : min), items[0]);
                setCurrentRegion({
                    latitude: firstItem.latitude,
                    longitude: firstItem.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            } else {
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }
        };

        getLocation();
    }, [items]);

    // 슬라이드 변경 시 지도 이동
    const handleScroll = (event) => {
        const viewWidth = Dimensions.get("screen").width;
        const index = Math.round(event.nativeEvent.contentOffset.x / viewWidth);

        if (mapRef.current && items[index]) {
            const { latitude, longitude } = items[index];
            mapRef.current.animateToRegion(
                {
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                500
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <GroupPlaceHeader navigation={navigation} />

            {/* 지도 */}
            {currentRegion && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={currentRegion}
                >
                    {items.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            title={item.name}
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
                data={items}
                renderItem={({ item }) => <GroupPlaceCards item={item} />}
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

// 스타일
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
