import React, {useContext} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import api from "../../../api/api";
import {GroupPlaceContext} from "../../../context/GroupPlaceContext";

const GroupPlaceCards = ({item}) => {


    // 이미지 URL 생성 함수
    const getFullImageUrl = () => {
        if (item.placeThumbnail) {
            /* T*/
            const baseURL = api.defaults?.baseURL || "http://localhost:8080";
            return {
                uri: `${baseURL}/file?filePath=${encodeURIComponent(item.placeThumbnail)}`
            };
        } else {
            return require("../../../assets/images/p-l-1.png"); // 기본 이미지
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.placeCard} activeOpacity={0.8}>
                {/* 이미지 표시 */}
                <Image source={getFullImageUrl(item.images)} style={styles.placeCardImage}/>
                <View style={styles.placeDetails}>
                    <Text style={styles.placeOrder}>{item.orders}번째 장소</Text>
                    <Text style={styles.placeName}>{item.placeName}</Text>
                    <Text numberOfLines={3}>{item.placeDescription}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GroupPlaceCards;


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width, // 화면 너비로 설정
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeCard: {
        width: '80%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 5,
    },
    placeCardImage: {
        width: '40%',
        height: '100%',
        borderRadius: 10,
    },
    placeDetails: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        marginLeft: 15,
        justifyContent: 'center',
    },
    placeName: {
        whiteSpace: 'nowrap',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    placeOrder: {
        marginTop: 5,
        color: '#6DB777',
        fontWeight: 'bold',
    },
});
