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
            if (loading) return;
            setLoading(true);

            try {
                const response = await api.get("/group/all", {
                    params: {
                        categoryIds: categories.length > 0 ? categories.map((category) => category.id) : [],
                        page: reset ? 0 : page,
                        size: 10,
                    },
                });

                const newData = response.data.content || [];

                // 중복 데이터 제거
                const uniqueData = reset
                    ? newData
                    : [...groupData, ...newData].filter(
                        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
                    );

                setGroupData(uniqueData);
                setHasMoreData(newData.length > 0); // 데이터가 더 있는지 확인
                if (!reset) setPage((prevPage) => prevPage + 1);
            } catch (err) {
                console.error("API Error:", err.message);
                setError(err.message || "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        },
        [categories, page, groupData, loading]
    );

    const refreshData = async () => {
        if (refreshing) return; // 중복 새로고침 방지
        setRefreshing(true);
        await fetchData(true); // 데이터 초기화 후 새로 로드
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData(true); // 초기 로드
    }, []);

    useEffect(() => {
        fetchData(true); // 카테고리 변경 시 데이터 초기화 후 새로 로드
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
                onLoadMore={hasMoreData && !loading ? () => fetchData() : null} // 추가 로드 시 중복 방지
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
