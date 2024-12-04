import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import GroupNavigationComponent from "../../components/group/GroupNavigationComponent";
import GroupCardsComponent from "../../components/group/GroupCardsComponent";
import api from "../../api/api";

const GroupListScreen = ({ navigation }) => {
    const [groupData, setGroupData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);

    // 데이터 가져오기 함수
    const fetchData = useCallback(
        async (reset = false) => {
            if (loading || (reset && refreshing)) return; // 중복 호출 방지
            if (!reset && !hasMoreData) return; // 추가 데이터가 없으면 호출 중단

            if (reset) {
                setRefreshing(true); // 새로고침 시작
            } else {
                setLoading(true); // 추가 데이터 로딩 시작
            }

            try {
                const currentPage = reset ? 0 : page;

                const response = await api.get("/group/all", {
                    params: {
                        categoryIds: categories.length > 0 ? categories.map((category) => category.id) : [],
                        page: currentPage,
                        size: 10,
                    },
                });

                const newData = response.data.content || [];

                const uniqueData = reset
                    ? newData // 새로고침이면 기존 데이터 초기화
                    : groupData.concat(newData.filter((item) => !groupData.some((existing) => existing.id === item.id)));

                setGroupData(uniqueData);
                setHasMoreData(newData.length > 0); // 새로운 데이터가 있으면 true
                if (!reset && newData.length > 0) {
                    setPage(currentPage + 1); // 페이지 증가
                }
            } catch (err) {
                console.error("API Error:", err.message);
                setError(err.message || "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                if (reset) {
                    setRefreshing(false); // 새로고침 종료
                } else {
                    setLoading(false); // 추가 로딩 종료
                }
            }
        },
        [categories, page, groupData, loading, refreshing, hasMoreData]
    );

    // 새로고침 함수
    const refreshData = useCallback(async () => {
        await fetchData(true); // 데이터를 초기화 후 새로 로드
        setPage(0); // 페이지 초기화
    }, [fetchData]);

    // 처음 로드
    useEffect(() => {
        fetchData(true); // 데이터 초기화 후 로드
    }, []);

    // 카테고리 변경 시 새로고침
    useEffect(() => {
        setPage(0); // 페이지 초기화
        fetchData(true); // 카테고리 변경 시 데이터 초기화 후 로드
    }, [categories]);

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} />
            <GroupNavigationComponent
                categories={categories}
                setCategories={setCategories}
            />
            <GroupCardsComponent
                navigation={navigation}
                data={groupData}
                loading={loading}
                refreshing={refreshing}
                onRefresh={refreshData}
                onLoadMore={hasMoreData && !loading ? () => fetchData() : null}
            />
        </View>
    );
};

export default GroupListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
