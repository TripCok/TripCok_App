import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../context/UserContext";
import api from "../../api/api";
import BoardContent from "../../components/group/details/BoardContent";
import HomeContent from "../../components/group/details/HomeContent";
import GroupApplicationsComoponent from "../../components/group/details/GroupApplicationsComoponent";

const GroupDetailScreen = ({ route, navigation }) => {
    const { item = {} } = route.params || {};
    const { userData } = useContext(UserContext);

    // 상태 관리
    const [isJoin, setIsJoin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    // 그룹 참여 여부 확인
    useEffect(() => {
        const checkIfJoined = () => {
            const members = item.members || [];
            setIsJoin(members.some((member) => member.id === userData.id));
        };

        const unsubscribe = navigation.addListener("focus", () => {
            checkIfJoined();
            setActiveTab("home"); // 탭 초기화
        });

        return unsubscribe;
    }, [navigation, item.members, userData.id]);

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
            } else {
                console.error("모임 신청 중 오류 발생:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    // 로딩 화면
    const renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6DB777" />
            <Text>로딩 중...</Text>
        </View>
    );

    // 데이터가 없는 경우 로딩 화면 표시
    if (!item || Object.keys(item).length === 0) {
        return renderLoading();
    }

    return (
        <View style={styles.screenContainer}>
            {/* 콘텐츠 영역 */}
            <ScrollView style={styles.container}>
                {/* 헤더 */}
                <View style={styles.groupTitleBox}>
                    <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                        <Icon name="chevron-back" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                </View>

                {/* 탭 네비게이션 */}
                <View style={styles.groupDetailNav}>
                    {["home", "board", "travel"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.groupDetailNavBtn,
                                activeTab === tab && styles.activeTab,
                            ]}
                            onPress={() =>
                                tab === "travel"
                                    ? navigation.navigate("GroupStack", {
                                        screen: "GroupPlace",
                                        params: {
                                            groupId: item.id,
                                            groupOwnerId: item.groupOwnerId,
                                        },
                                    })
                                    : setActiveTab(tab)
                            }
                        >
                            <Text style={styles.groupDetailNavTitle}>
                                {tab === "home" ? "홈" : tab === "board" ? "게시판" : "여행지"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 활성화된 탭에 따른 콘텐츠 */}
                {activeTab === "home" ? (
                    <HomeContent item={item} />
                ) : (
                    <BoardContent item={item} navigation={navigation} />
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
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.groupJoinText}>가입하기</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.groupAdminNav}>
                    <TouchableOpacity
                        style={styles.groupAdminBtn}
                        onPress={() =>
                            navigation.navigate("GroupStack", {
                                screen: "CreatePost",
                                params: { groupId: item.id },
                            })
                        }
                    >
                        <Icon name="pencil-outline" size={22} color="white" />
                    </TouchableOpacity>
                    {item.groupOwnerId === userData.id && (
                        <>
                            <TouchableOpacity
                                style={styles.groupAdminBtn}
                                onPress={() => setModalVisible(true)}
                            >
                                <Icon name="mail" size={22} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.groupAdminBtn}>
                                <Icon name="settings-sharp" size={22} color="white" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
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
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 64,
    },
    container: {
        paddingHorizontal: 20,
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
        fontSize: 16,
        fontWeight: "500",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: "#6DB777",
    },
    groupJoinBtnContainer: {
        padding: 10,
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#dadada",
    },
    groupJoinBtn: {
        width: "80%",
        height: 40,
        backgroundColor: "#6DB777",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 99,
    },
    disabledJoinBtn: {
        backgroundColor: "#ccc",
    },
    groupJoinText: {
        fontSize: 16,
        color: "white",
    },
    groupAdminNav: {
        position: "absolute",
        bottom: 30,
        right: 30,
        flexDirection: "column",
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
