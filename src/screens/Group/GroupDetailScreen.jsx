import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {UserContext} from "../../context/UserContext";
import api from "../../api/api";
import BoardContent from "../../components/group/details/BoardContent";
import HomeContent from "../../components/group/details/HomeContent";
import GroupApplicationsComoponent from "../../components/group/details/GroupApplicationsComoponent";

const GroupDetailScreen = ({route, navigation}) => {
    const {item = {}} = route.params || {};
    const {userData} = useContext(UserContext);

    // 상태 관리
    const [isJoin, setIsJoin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    // 가입 여부 확인
    const checkIfJoined = () => {
        const members = item.members || [];
        const foundMember = members.find((member) => member.id === userData.id);
        setIsJoin(!!foundMember);
    };

    // 모임 가입 처리
    const handleJoinGroup = async () => {
        setLoading(true);
        try {
            const response = await api.post("/application", {
                memberId: userData.id,
                groupId: item.id,
            });
            if (response.status === 200) {
                alert("모임 신청이 완료되었습니다.");
                setIsJoin(true);
            }
        } catch (error) {
            if (error.response?.status === 409) {
                alert("이미 신청된 모임입니다.");
            }
            console.error("모임 신청 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    // 화면 진입 시 상태 초기화
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            checkIfJoined();
            setActiveTab("home");
        });
        return unsubscribe;
    }, [navigation, item.members, userData.id]);

    // 데이터가 없는 경우 로딩 화면
    if (!item || Object.keys(item).length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            {/* 콘텐츠 영역 */}
            <ScrollView style={styles.container}>
                {/* 헤더 */}
                <View style={styles.groupTitleBox}>
                    <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                        <Icon name="chevron-back" size={28}/>
                    </TouchableOpacity>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                </View>

                {/* 탭 네비게이션 */}
                <View style={styles.groupDetailNav}>
                    <TouchableOpacity
                        style={[
                            styles.groupDetailNavBtn,
                            activeTab === "home" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("home")}
                    >
                        <Text style={styles.groupDetailNavTitle}>홈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.groupDetailNavBtn,
                            activeTab === "board" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("board")}
                    >
                        <Text style={styles.groupDetailNavTitle}>게시판</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.groupDetailNavBtn,
                            activeTab === "travel" && styles.activeTab,
                        ]}
                        onPress={() =>
                            navigation.navigate("GroupStack", {
                                screen: "GroupPlace",
                                params: {
                                    navigation,
                                    groupId: item.id,
                                    groupOwnerId: item.groupOwnerId,
                                },
                            })
                        }
                    >
                        <Text style={styles.groupDetailNavTitle}>여행지</Text>
                    </TouchableOpacity>
                </View>

                {/* 활성화된 탭에 따른 콘텐츠 */}
                {activeTab === "home" ? (
                    <HomeContent item={item}/>
                ) : (
                    <BoardContent item={item} navigation={navigation}/>
                )}
            </ScrollView>

            {/* 하단 버튼 */}
            {!isJoin ? (
                <View style={styles.groupJoinBtnContainer}>
                    <TouchableOpacity
                        style={[
                            styles.groupJoinBtn,
                            !item.recruiting && styles.disabledJoinBtn,
                        ]}
                        disabled={!item.recruiting || loading}
                        onPress={handleJoinGroup}
                    >
                        {loading ? (
                            <ActivityIndicator color="white"/>
                        ) : (
                            <Text style={styles.groupJoinText}>가입하기</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (item.groupOwnerId === userData.id ? (
                    <View style={styles.groupAdminNav}>
                        <TouchableOpacity
                            style={styles.groupAdminBtn}
                            onPress={() =>
                                navigation.navigate("GroupStack", {
                                    screen: "CreatePost",
                                    params: {navigation, groupId: item.id},
                                })
                            }
                        >
                            <Icon name="pencil-outline" size={22} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.groupAdminBtn}
                            onPress={() => setModalVisible(true)}
                        >
                            <Icon name="mail" size={22} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.groupAdminBtn}>
                            <Icon name="settings-sharp" size={22} color="white"/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.groupAdminNav}>
                        <TouchableOpacity
                            style={styles.groupAdminBtn}
                            onPress={() =>
                                navigation.navigate("GroupStack", {
                                    screen: "CreatePost",
                                    params: {navigation, groupId: item.id},
                                })
                            }
                        >
                            <Icon name="pencil-outline" size={22} color="white"/>
                        </TouchableOpacity>
                    </View>
                )

            )}

            {/* 모임 신청 모달 */}
            <GroupApplicationsComoponent
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                groupId={item.id}
            />
        </View>
    );
};

export default GroupDetailScreen;

// 스타일
const styles = StyleSheet.create({
    screenContainer: {
        position: "relative",
        height: "100%",
        paddingTop: 64,
        backgroundColor: "#fff",
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    groupTitleBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    groupTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    groupDetailNav: {
        marginTop: 20,
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
        fontWeight: "500",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: "#6DB777",
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 99,
    },
    disabledJoinBtn: {
        backgroundColor: "#ccc",
    },
    groupJoinText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },
    groupAdminNav: {
        position: "absolute",
        padding: 30,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 10,
    },
    groupAdminBtn: {
        width: 50,
        height: 50,
        backgroundColor: "#6DB777",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 99,
    },
});