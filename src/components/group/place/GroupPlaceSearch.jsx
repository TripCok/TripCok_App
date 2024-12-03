import React, {useContext, useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../../api/api";
import {UserContext} from "../../../context/UserContext";
import {GroupPlaceContext} from "../../../context/GroupPlaceContext";

const GroupPlaceSearch = ({isVisible, text, groupId, groupOwnerId}) => {
    const {places, fetchGroupPlaces} = useContext(GroupPlaceContext);
    const {userData} = useContext(UserContext);
    const [searchResult, setSearchResult] = useState([]); // 빈 배열로 초기화

    const fetchResults = async () => {
        if (!text.trim()) return; // 검색어가 비어 있을 경우 요청하지 않음

        try {
            const response = await api.get(`/place`, {
                params: {
                    placeName: text,
                    size: 3,
                },
            });
            if (response.status === 200) {
                console.log("Search Results:", response.data.content);
                setSearchResult(response.data.content || []); // 검색 결과 배열로 설정
            } else {
                setSearchResult([]); // 데이터가 없을 경우 빈 배열
            }
        } catch (error) {
            console.error("Failed to fetch places:", error);
            setSearchResult([]); // 오류 시 빈 배열
        }
    };

    const addGroupInPlace = async (itemId) => {
        const data = {
            memberId: userData.id,
            groupId: groupId,
            placeId: itemId,
        };

        try {
            const response = await api.post(`/group/place`, data, {
                headers: {"Content-Type": "application/json"},
            });
            if (response.status === 201) {
                alert(response.data.message);
                fetchGroupPlaces(groupId); // 그룹 장소 새로고침
            }
        } catch (error) {
            console.error("Failed to add place:", error);
        }
    };

    const removeGroupInPlace = async (itemId) => {
        try {
            const response = await api.delete(`/group/place`, {
                params: {
                    "placeId": itemId,
                    "groupId": groupId,
                    "memberId": userData.id,
                }
            });
            if (response.status === 200) {
                alert(response.data.message);
                fetchGroupPlaces(groupId); // 그룹 장소 새로고침
            }
        } catch (error) {
            console.error("Failed to remove place:", error);
        }
    };

    const isPlaceInGroup = (placeId) => {
        return places.some((place) => place.placeId === placeId); // 그룹에 Place가 있는지 확인
    };

    const getFullImageUrl = (item) => {
        if (item.placeThumbnail) {
            const baseURL = api.defaults?.baseURL || "http://localhost:8080";
            return {
                uri: `${baseURL}/file?filePath=${encodeURIComponent(item.placeThumbnail)}`,
            };
        } else {
            return require("../../../assets/images/p-l-1.png"); // 기본 이미지
        }
    };

    // text가 변경될 때만 API 호출
    useEffect(() => {
        fetchResults();
    }, [text]);

    if (!isVisible || !text.trim() || searchResult.length === 0) return null;

    return (
        <View style={styles.container}>
            {searchResult.map((place, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image source={getFullImageUrl(place)} style={styles.image}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.placeName}>{place.name}</Text>
                    </View>
                    {groupOwnerId === userData.id && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                isPlaceInGroup(place.id)
                                    ? removeGroupInPlace(place.id)
                                    : addGroupInPlace(place.id)
                            }
                        >
                            <Icon
                                name={isPlaceInGroup(place.id) ? "remove-circle" : "add-circle"}
                                size={30}
                                color={isPlaceInGroup(place.id) ? "#FF0000" : "#6DB777"}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

export default GroupPlaceSearch;


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
        zIndex: 99,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        gap: 10
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
    },
    placeName: {
        fontSize: 16,
    }
})