import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ImageBackground, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native';
import {CategoryContext} from '../../context/CategoryContext';
import api from "../../api/api";

const PlaceCards = ({navigation}) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {selectedCategories} = useContext(CategoryContext);

    useEffect(() => {
        fetchPlaces();
    }, [selectedCategories]);

    const fetchPlaces = async () => {
        try {
            setLoading(true);
            const categoryIds = selectedCategories.map((cat) => cat.id).join(',');
            const response = await api.get(`/place?page=0&size=10&categories=${categoryIds}`);
            const data = response.data.content;

            const formattedData = data.map((item) => ({
                id: item.id.toString(),
                title: item.name,
                image: item.images[0] ? getFullImageUrl(item.images[0].imagePath) : null,
            }));

            setPlaces(formattedData);
        } catch (error) {
            console.error("Failed to fetch places:", error);
            setError("데이터를 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const getFullImageUrl = (filePath) => {
        const baseURL = api.defaults?.baseURL || "http://localhost:8080";
        return `${baseURL}/file?filePath=${encodeURIComponent(filePath)}`;
    };

    const CardItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Place', {id: item.id})}
        >
            {item.image ? (
                <ImageBackground source={{uri: item.image}} style={styles.image} imageStyle={styles.imageStyle}>
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </ImageBackground>
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                    <Text style={styles.placeholderText}>이미지 없음</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchPlaces} style={styles.retryButton}>
                    <Text style={styles.retryText}>다시 시도</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={places}
            renderItem={({item}) => <CardItem item={item}/>}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.placeCardsContainer}
        />
    );
};

export default PlaceCards;


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeCardsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        height: 220,
    },
    image: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    imageStyle: {
        borderRadius: 10,
    },
    overlay: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
        lineHeight: 20,
    },
    pinButton: {
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
    },
    placeholderText: {
        color: "#999",
        fontSize: 14,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },
});
