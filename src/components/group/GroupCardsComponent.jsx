import React, {useContext, useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import GroupCardComponent from "./GroupCardComponent";
import api from "../../api/api";
import {GroupContext} from "../../context/GroupContext";
import {useFocusEffect} from '@react-navigation/native';

const GroupCardsComponent = ({navigation}) => {
    const {groupData, setGroupData, page, setPage} = useContext(GroupContext);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태 추가
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = async (currentPage, reset = false) => {
        if (!hasMore && !reset) return;
        setLoading(true);

        try {
            const response = await api.get('/group/all', {
                params: {
                    page: currentPage,
                    size: 10,
                    query: '',
                },
            });
            const newContent = response.data.content || [];
            setGroupData((prevData) =>
                reset ? newContent : [...prevData, ...newContent]
            );
            setHasMore(newContent.length > 0);
        } catch (err) {
            setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        setRefreshing(true); // 새로고침 상태 시작
        try {
            await fetchData(0, true); // 첫 페이지 데이터 다시 로드
        } finally {
            setRefreshing(false); // 새로고침 상태 종료
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useFocusEffect(
        useCallback(() => {
            setPage(0); // 첫 페이지로 리셋
            fetchData(0, true); // 데이터를 리셋한 뒤 로드
        }, [])
    );

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <FlatList
            data={groupData}
            renderItem={({item}) => <GroupCardComponent navigation={navigation} item={item}/>}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing} // 새로고침 상태
            onRefresh={refreshData} // 새로고침 함수
            ListFooterComponent={
                loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff"/>
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
    },
    loaderContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
