import React from "react";
import {FlatList, ActivityIndicator, View, StyleSheet, Text} from "react-native";
import GroupCardComponent from "./GroupCardComponent";

const GroupCardsComponent = ({navigation, data, loading, refreshing, onRefresh, onLoadMore}) => {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => <GroupCardComponent navigation={navigation} item={item}/>}
            keyExtractor={(item, index) => `${item.id}-${index}-${item.groupName}`} // 고유한 키 생성
            refreshing={refreshing} // 새로고침 상태
            onRefresh={!refreshing ? onRefresh : undefined} // 중복 호출 방지
            onEndReached={!loading ? onLoadMore : undefined} // 추가 로드
            onEndReachedThreshold={0.5} // 스크롤 임계점
            ListFooterComponent={
                loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#6DB777"/>
                    </View>
                ) : (
                    <View style={styles.noMoreData}>
                        <Text style={styles.noMoreDataText}>
                            {data.length === 0 ? "데이터가 없습니다." : "더 이상 결과가 없습니다."}
                        </Text>
                    </View>
                )
            }
            contentContainerStyle={data.length === 0 ? styles.emptyContainer : styles.container}
            ListEmptyComponent={
                !loading && !refreshing ? (
                    <View style={styles.emptyMessage}>
                        <Text style={styles.emptyMessageText}>사용 가능한 모임이 없습니다.</Text>
                    </View>
                ) : null
            }
        />
    );
};

export default GroupCardsComponent;

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
    },
    loaderContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    noMoreData: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    noMoreDataText: {
        color: "#888",
        fontSize: 14,
        fontStyle: "italic",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyMessage: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyMessageText: {
        color: "#888",
        fontSize: 16,
        fontStyle: "italic",
    },
});
