import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";

const GroupPlaceCards = ({ item }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.placeCard} activeOpacity={0.8}>
                <Image source={item.image} style={styles.placeCardImage} />
                <View style={styles.placeDetails}>
                    <Text style={styles.placeName}>{item.name}</Text>
                    <Text style={styles.placeOrder}>{item.order}번째 장소</Text>
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
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    placeCardImage: {
        width: '40%',
        height: '100%',
        borderRadius: 10,
    },
    placeDetails: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeOrder: {
        marginTop: 5,
        color: '#888',
    },
});
