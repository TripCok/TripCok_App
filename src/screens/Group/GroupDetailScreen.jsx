import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BoardContent from "../../components/group/details/BoardContent";
import HomeContent from "../../components/group/details/HomeContent";
import Icon from "react-native-vector-icons/Ionicons";
import GroupApplicationsComoponent from "../../components/group/details/GroupApplicationsComoponent";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";

const GroupDetailScreen = ({route, navigation}) => {
    const {item = {}} = route.params || {};
    const {userData} = useContext(UserContext);
    const [isJoin, setIsJoin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("home"); // 현재 활성화된 탭 ("home" 또는 "board")

    const checkIfJoined = () => {
        const members = item.members || [];
        const foundMember = members.find((member) => member.id === userData.id);
        setIsJoin(!!foundMember);
    };

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

    useEffect(() => {
        return navigation.addListener("focus", () => {
            checkIfJoined();
            setActiveTab("home");
        });
    }, [navigation, item.members, userData.id]);

    if (!item || Object.keys(item).length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    return (
        <View style={{position: "relative", height: "100%", paddingTop: 64, backgroundColor: "#fff"}}>
            <ScrollView style={styles.container}>
                <View style={styles.groupTitleBox}>
                    <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                        <Icon name="chevron-back" size={28}/>
                    </TouchableOpacity>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                </View>
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
                </View>

                {/* 활성화된 탭에 따라 콘텐츠 렌더링 */}
                {activeTab === "home" ? (
                    <HomeContent item={item}/>
                ) : (
                    <BoardContent item={item} navigation={navigation}/>
                )}
            </ScrollView>

            {!isJoin ? (
                <View style={styles.groupJoinBtnContainer}>
                    <TouchableOpacity
                        style={[
                            styles.groupJoinBtn,
                            !item.recruiting && {backgroundColor: "#ccc"},
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
            ) : (
                <View style={styles.groupAdminNav}>
                    <TouchableOpacity style={styles.groupAdminBtn}>
                        <Icon name="trail-sign-sharp" size={22} color="white"/>
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
            )}

            <GroupApplicationsComoponent
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                groupId={item.id}
            />
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
    },
    groupAdminNav: {
        position: "absolute",
        padding: 30,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 10
    },
    groupAdminBtn: {
        width: 50,
        height: 50,
        backgroundColor: "#6DB777",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 99
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: "#6DB777",
    }

});
