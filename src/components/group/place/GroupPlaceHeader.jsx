import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import GroupPlaceOrderModal from "./GroupPlaceOrderModal";

const GroupPlaceHeader = ({navigation, groupOwnerId}) => {

    const [isOrderModalVisible, setOrderModalVisible] = useState(false);

    const toggleOrderModal = () => {
        setOrderModalVisible(!isOrderModalVisible);
    };


    return (
        <View style={styles.mapsHeaderContainer}>
            <View style={styles.firstSection}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={30} color="#6DB777"/>
                </TouchableOpacity>

                {/* 검색 입력창 */}
                <View style={styles.searchBoxContainer}>
                    <Icon name="search-sharp" size={22} color="#888" style={styles.searchIcon}/>
                    <TextInput style={styles.searchBox} placeholder="검색"/>
                </View>

                {/* 지도 전환 버튼 */}
                <TouchableOpacity style={styles.mapButton}>
                    <Icon name="list-sharp" size={22} color="white"/>
                </TouchableOpacity>
            </View>
            {groupOwnerId && (
                <ScrollView horizontal style={styles.adminGroupPlaceNav}>
                    <TouchableOpacity style={styles.adminGroupPlaceBox}>
                        <IconM name="crown" size={22} color="white"></IconM>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.adminGroupPlaceBox} onPress={toggleOrderModal}>
                        <Text style={{color: 'white', fontWeight: 500}}>순서 조절</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.adminGroupPlaceBox}>
                        <Text style={{color: 'white', fontWeight: 500}}>장소 추천</Text>
                    </TouchableOpacity>
                </ScrollView>)
            }
            {/* 순서 조절 모달 */}
            <GroupPlaceOrderModal isVisible={isOrderModalVisible} toggleModal={toggleOrderModal}/>

        </View>
    );
};

export default GroupPlaceHeader;

const styles = StyleSheet.create({
    // 헤더 컨테이너
    mapsHeaderContainer: {
        position: "absolute",
        width: Dimensions.get("screen").width,
        paddingTop: 60,
        paddingHorizontal: 20,
        zIndex: 50,

    },
    firstSection: {
        flexDirection: "row",
        justifyContent: "space-between"
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
    }, adminGroupPlaceNav: {
        marginTop: 10,
        width: '100%',
        display: "flex",
    },
    adminGroupPlaceBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 99,
        backgroundColor: "#6DB777",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    }


});
