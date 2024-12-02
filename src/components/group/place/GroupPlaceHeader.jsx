import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const GroupPlaceHeader = ({ navigation }) => {
    return (
        <View style={styles.mapsHeaderContainer}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={30} color="#6DB777" />
            </TouchableOpacity>

            {/* 검색 입력창 */}
            <View style={styles.searchBoxContainer}>
                <Icon name="search-sharp" size={22} color="#888" style={styles.searchIcon} />
                <TextInput style={styles.searchBox} placeholder="검색" />
            </View>

            {/* 지도 전환 버튼 */}
            <TouchableOpacity style={styles.mapButton}>
                <Icon name="list-sharp" size={22} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default GroupPlaceHeader;

const styles = StyleSheet.create({
    // 헤더 컨테이너
    mapsHeaderContainer: {
        position: "absolute",
        width: Dimensions.get("screen").width,
        flexDirection: "row",
        paddingTop: 60,
        paddingHorizontal: 20,
        zIndex: 50,
        justifyContent: "space-between",
    },
    // 뒤로가기 및 지도 버튼
    backButtonContainer: {
        backgroundColor: "white",
        width: 40,
        height: 40,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    mapButton: {
        backgroundColor: "#6DB777",
        width: 40,
        height: 40,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    // 검색박스 컨테이너
    searchBoxContainer: {
        width: "70%",
        justifyContent: "center",
        position: "relative",
    },
    searchBox: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 99,
        paddingHorizontal: 20,
    },
    searchIcon: {
        position: "absolute",
        zIndex: 1,
        right: 10,
    },
});
