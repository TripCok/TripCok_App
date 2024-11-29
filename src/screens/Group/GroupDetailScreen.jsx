import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import Icon from "react-native-vector-icons/Ionicons";
import GroupMembersComponent from "../../components/group/details/GroupMembersComponent";
import {UserContext} from "../../context/UserContext";

const GroupDetailScreen = ({route, navigation}) => {
    const {item = {}} = route.params || {}; // 기본값 처리
    const {userData} = useContext(UserContext);
    const [isJoin, setIsJoin] = useState(false);

    console.log(item);

    const checkIfJoined = () => {
        const members = item.members || []; // 기본값 설정
        const foundMember = members.find(member => member.id === userData.id);
        setIsJoin(!!foundMember);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            checkIfJoined();
        });
        return unsubscribe;
    }, [navigation, item.members, userData.id]);

    // 로딩 상태 처리
    if (!item || Object.keys(item).length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    return (
        <View style={{position: "relative", height: "100%", backgroundColor: "#fff"}}>
            <HeaderComponent navigation={navigation}></HeaderComponent>
            <ScrollView style={styles.container}>
                <View style={styles.groupTitleBox}>
                    <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                        <Icon name="chevron-back" size={28}></Icon>
                    </TouchableOpacity>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                </View>
                <View style={styles.groupDetailNav}>
                    <TouchableOpacity
                        style={[styles.groupDetailNavBtn, {borderBottomWidth: 3, borderColor: "#6DB777"}]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.groupDetailNavTitle}>홈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupDetailNavBtn}
                        onPress={() => isJoin ? alert("아직 준비되지 않은 기능입니다.") : alert("가입후 사용 할 수 있는 기능입니다.")}>
                        <Text style={styles.groupDetailNavTitle}>게시판</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupDetailNavBtn}
                        onPress={() => isJoin ? alert("아직 준비되지 않은 기능입니다.") : alert("가입후 사용 할 수 있는 기능입니다.")}>
                        <Text style={styles.groupDetailNavTitle}>사진첩</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupDetailNavBtn}
                        onPress={() => isJoin ? alert("아직 준비되지 않은 기능입니다.") : alert("가입후 사용 할 수 있는 기능입니다.")}>
                        <Text style={styles.groupDetailNavTitle}>채팅</Text>
                    </TouchableOpacity>
                </View>

                <Image source={{uri: "https://via.placeholder.com/150"}} style={styles.groupThumbnail}></Image>

                <View>
                    <ScrollView horizontal style={styles.groupCategoriesBox}>
                        <View style={styles.groupCategoryBox}>
                            <Text style={styles.groupCategoryText}>맴버 {item.groupMemberCount || 0}명</Text>
                        </View>
                        <View style={styles.groupCategoryBox}>
                            <Text style={styles.groupCategoryText}>모집 {item.recruiting ? "ON" : "OFF"}</Text>
                        </View>
                        {item.categories && item.categories.length > 0 ? (
                            item.categories.map((c, index) => (
                                <View key={c.id} style={styles.groupCategoryBox}>
                                    <Text style={styles.groupCategoryText}>{c.name}</Text>
                                </View>
                            ))
                        ) : null}
                    </ScrollView>
                </View>

                <Text style={styles.groupDesc}>{item.description}</Text>
                <GroupMembersComponent item={item.members || []}/>
            </ScrollView>

            {!isJoin && (
                <View style={styles.groupJoinBtnContainer}>
                    <TouchableOpacity
                        style={[
                            styles.groupJoinBtn,
                            !item.recruiting && {backgroundColor: '#ccc'}
                        ]}
                        disabled={!item.recruiting}
                    >
                        <Text style={styles.groupJoinText}>가입하기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


export default GroupDetailScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    groupTitleBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    groupTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }, groupImgContainer: {
        width: "100%",
        height: 200,
    },
    groupDetailNav: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    groupDetailNavBtn: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    groupDetailNavTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 500,
    },
    groupThumbnail: {
        marginTop: 20,
        width: "100%",
        height: 200,
    },
    groupCategoriesBox: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
    },
    groupCategoryBox: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6DB777",
        marginRight: 10
    },
    groupCategoryText: {
        fontSize: 14,
        fontWeight: 500
    },
    groupDesc: {
        fontSize: 16,
        fontWeight: 400,
        width: "100%",
        borderColor: "#dadada",
        paddingBottom: 20,
        borderBottomWidth: 2

    },
    groupJoinBtnContainer: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 30,
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#dadada",
    },
    groupJoinBtn: {
        width: "80%",
        height: 40,
        backgroundColor: "#6DB777",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 99
    },
    groupJoinText: {
        fontSize: 16,
        fontWeight: 500,
        color: "white",
    }, alreadyJoinedText: {
        fontSize: 16,
        fontWeight: 500,
        color: "white",
    }


});
