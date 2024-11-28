import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, FlatList } from "react-native";
import GroupCardComponent from "./GroupCardComponent";
import api from "../../api/api";

const GroupCardsComponent = () => {
    const [data, setData] = useState([]); // 데이터를 배열로 초기화
    const [loading, setLoading] = useState(false); // 데이터 로드 상태
    const [error, setError] = useState(null); // 에러 상태
    const [page, setPage] = useState(0); // 현재 페이지
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부

    const fetchData = async (currentPage) => {
        if (!hasMore || loading) return; // 이미 로드 중이거나 더 가져올 데이터가 없으면 종료
        setLoading(true);

        try {
            const response = await api.get('/group/all', {
                params: {
                    page: currentPage,
                    size: 10,
                    query: "",
                },
            });

            const newContent = response.data.content || [];
            setData((prevData) => [...prevData, ...newContent]); // 기존 데이터에 새 데이터 추가
            setHasMore(newContent.length > 0); // 더 이상 데이터가 없으면 false
        } catch (err) {
            setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page); // 컴포넌트가 마운트될 때 첫 페이지 데이터 로드
    }, [page]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1); // 다음 페이지 요청
        }
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <GroupCardComponent item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            onEndReached={loadMore} // 스크롤 끝에 도달하면 loadMore 호출
            onEndReachedThreshold={0.5} // 스크롤의 50% 지점에서 다음 페이지 요청
            ListFooterComponent={
                loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : null
            }
            ListEmptyComponent={
                !loading && !data.length ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>표시할 그룹이 없습니다.</Text>
                    </View>
                ) : null
            }
        />
    );
};

export default GroupCardsComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})