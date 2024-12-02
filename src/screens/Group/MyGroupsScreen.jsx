import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import GroupNavigationComponent from "../../components/group/GroupNavigationComponent";
import GroupCardsComponent from "../../components/group/GroupCardsComponent";
import api from "../../api/api";
import { UserContext } from "../../context/UserContext";

const MyGroupsScreen = ({ navigation }) => {
    const { userData } = useContext(UserContext);
    const [groupData, setGroupData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [initialized, setInitialized] = useState(false);

    const fetchData = useCallback(
        async (reset = false) => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await api.get("/group/my", {
                    params: {
                        categories: categories.length > 0 ? categories.map((category) => category.id) : [],
                        page: reset ? 0 : page,
                        size: 10,
                        memberId: userData?.id,
                    },
                });

                const newData = response.data.content || [];
                const uniqueData = reset
                    ? newData
                    : [...groupData, ...newData].filter(
                        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
                    );

                setGroupData(uniqueData);
                if (!reset) setPage((prevPage) => prevPage + 1);
            } catch (err) {
                console.error("API Error:", err.message);
            } finally {
                setLoading(false);
            }
        },
        [categories, page, groupData, loading, userData]
    );

    const refreshData = async () => {
        if (refreshing) return; // 중복 새로고침 방지
        setRefreshing(true);
        await fetchData(true);
        setRefreshing(false);
    };

    useEffect(() => {
        if (!initialized) {
            fetchData(true);
            setInitialized(true);
        }
    }, [initialized]);

    useEffect(() => {
        if (initialized) {
            fetchData(true);
        }
    }, [categories]);

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} />
            <View style={styles.contentContainer}>
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
                    onLoadMore={() => fetchData()}
                />
            </View>
        </View>
    );
};

export default MyGroupsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        flex: 1,
    },
});
