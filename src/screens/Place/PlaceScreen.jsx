import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import api from "../../api/api";
import Icon from "react-native-vector-icons/Ionicons";

const PlaceScreen = ({route, navigation}) => {
    const {id} = route.params; // 전달받은 여행지 ID
    const [placeDetails, setPlaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [commonImg, setCommonImg] = useState([]);

    // 화면이 활성화될 때마다 데이터를 다시 가져옴
    useFocusEffect(
        useCallback(() => {
            fetchPlaceDetails();
        }, [id])
    );

    const fetchPlaceDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get(`/place/${id}`);
            const data = response.data;

            setPlaceDetails(data);

            // Thumbnail 이미지 처리
            const thumbnailItem = data.images?.find(item => item.imageType === 'T');
            if (thumbnailItem?.imagePath) {
                setThumbnail(thumbnailItem.imagePath);
            } else {
                setThumbnail(null);
            }

            // Common 이미지 처리
            const commonImgItems = data.images?.filter(item => item.imageType === 'C') || [];
            const commonImgUrls = commonImgItems.map(item => item.imagePath);
            setCommonImg(commonImgUrls);

        } catch (err) {
            setError("데이터를 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchPlaceDetails} style={styles.retryButton}>
                    <Text style={styles.retryText}>다시 시도</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {thumbnail ? (
                    <View style={styles.thumbnailImageBox}>
                        <Image source={{uri: thumbnail}} style={styles.thumbnailImage}/>
                        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('PlaceList')}>
                            <Icon name="arrow-back-outline" size={40} color="black"/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.placeholder}>
                        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('PlaceList')}>
                            <Icon name="arrow-back-outline" size={40} color="black"/>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.detailsContainer}>
                    <Text style={styles.placeTitle}>{placeDetails.name}</Text>

                    <Text style={styles.placeTextTitle}>카테고리</Text>

                    <ScrollView horizontal style={styles.categoriesContainer}>
                        {placeDetails && placeDetails.categories && placeDetails.categories.length > 0 ? (
                            placeDetails.categories.map((category, index) => (
                                <View key={index} style={styles.placeCategoryItem}>
                                    <Text style={styles.placeCategoryItemText}>{category}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>카테고리가 없습니다.</Text>
                        )}
                    </ScrollView>


                    <Text style={styles.placeTextTitle}>상세 보기</Text>
                    <Text style={styles.placeDesc}>{placeDetails.description}</Text>

                    <Text style={styles.placeTextTitle}>주소</Text>
                    <Text style={styles.placeDesc}>{placeDetails.address}</Text>

                    <Text style={styles.placeTextTitle}>운영시간</Text>
                    <Text style={styles.placeDesc}>{placeDetails.startTime} ~ {placeDetails.endTime}</Text>

                    <Text style={styles.placeTextTitle}>관련 사진</Text>
                    <ScrollView horizontal style={styles.commonImgBox}>
                        {commonImg.length === 0 ? (
                            <Text>관련 사진이 없습니다.</Text>
                        ) : (
                            commonImg.map((item, index) => (
                                <Image
                                    key={index}
                                    style={styles.commonImg}
                                    source={{uri: item}}
                                    onError={() => console.log("Failed to load image:", item)}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default PlaceScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    thumbnailImageBox: {
        width: '100%',
        minHeight: 300,
        maxHeight: 300,
        position: 'relative',
    },
    thumbnailImage: {
        minHeight: 300,
        minWidth: '100%',
        objectFit: 'fill',
    },
    placeholder:{
        minHeight:300,
        width:'100%',
    },
    backIcon: {
        position: 'absolute',
        marginTop: 30,
        padding: 20,
        color: '#6DB777',
    },

    detailsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    placeTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: '600',
    },
    placeDesc: {
        fontSize: 16,
        fontWeight: '400',
        overflowY: 'auto',
    },
    placeTextTitle: {
        marginTop: 20,
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '700',
        color: '#6DB777',
    },
    placeCategoryItem: {
        marginRight: 10,
        padding: 10,
        borderRadius: 99,
        backgroundColor: '#6DB777',
        color: 'white',
    },
    placeCategoryItemTest: {
        color: '#fff',
        fontWeight: '600'
    },

    commonImgBox: {
        width: '100%',
        height: 150,
        marginBottom: 50,
        borderRadius: 10
    },
    commonImg: {
        width: 200,
        height: '100%',
        objectFit: 'fill',
        borderRadius: 10
    }


});
