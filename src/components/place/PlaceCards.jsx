import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {CategoryContext} from '../../context/CategoryContext';
import api from "../../api/api";

const PlaceCards = ({navigation}) => {
    const [places, setPlaces] = useState([]);
    const [page, setPage] = useState(0); // 페이지 번호 상태 추가
    const [hasMore, setHasMore] = useState(true); // 데이터 로드 가능 여부
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const {selectedCategories} = useContext(CategoryContext);

    useEffect(() => {
        const fetchData = async () => {
            setPage(0); // 카테고리 변경 시 페이지 초기화
            setPlaces([]); // 기존 데이터 초기화
            await fetchPlaces(0); // 첫 페이지 데이터 로드
        };
        fetchData();
    }, [selectedCategories]);

    const fetchPlaces = async (pageToLoad) => {
        try {
            if (!hasMore && pageToLoad > 0) return; // 더 이상 데이터가 없으면 요청 중단
            setLoading(true);
            const categoryIds = selectedCategories.map((cat) => cat.id).join(',');
            const response = await api.get(`/place`, {
                params: {
                    page: pageToLoad,
                    size: 10,
                    categoryIds: categoryIds,
                    name: ''
                }
            });

            if (response.status === 200) {
                const data = response.data.content;
                console.log(data[5]);

                const formattedData = data.map((item) => ({
                    id: item.id.toString(),
                    title: item.name,
                    image: item.placeThumbnail,
                }));

                setPlaces((prevPlaces) => [...prevPlaces, ...formattedData]); // 기존 데이터와 병합
                setHasMore(data.length > 0); // 더 이상 데이터가 없으면 false
                setPage(pageToLoad + 1); // 다음 페이지 번호 증가
            }
        } catch (error) {
            console.error("Failed to fetch places:", error);
            setError("데이터를 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setPage(0);
        setHasMore(true);
        setPlaces([]);
        await fetchPlaces(0);
        setRefreshing(false);
    };

    const CardItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PlaceStack", {screen: "Place", params: {id: item.id}})}
        >
            {item.image ? (
                <ImageBackground source={{uri: item.image}} style={styles.image} imageStyle={styles.imageStyle}>
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </ImageBackground>
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                    <View style={styles.overlay}>
                        <Text style={[styles.title, {color: '#6DB777'}]}>{item.title}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );

    if (loading && !refreshing && places.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    if (error && places.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => fetchPlaces(0)} style={styles.retryButton}>
                    <Text style={styles.retryText}>다시 시도</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={places}
            renderItem={({item}) => <CardItem item={item}/>}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.placeCardsContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#6DB777"]}
                />
            }
            onEndReached={() => fetchPlaces(page)} // 스크롤 끝에 도달 시 호출
            onEndReachedThreshold={0.5} // 트리거 임계값 설정 (0.5는 스크롤이 50% 남았을 때 호출)
            ListFooterComponent={
                loading && hasMore ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#6DB777"/>
                    </View>
                ) : null
            }
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
        maxWidth: '50%',
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
    },
    title: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
        lineHeight: 20,
    },
    // placeholder: {
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#e0e0e0",
    // },
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
