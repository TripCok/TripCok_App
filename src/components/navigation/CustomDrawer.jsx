import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = ({ navigation }) => {
    const { userData, setUserData, setHasOnboarded } = useContext(UserContext);

    const handleLogout = async () => {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "로그아웃",
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            setHasOnboarded(false);
                            setUserData(null);

                            setTimeout(() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Onboarding" }],
                                });
                            }, 100);
                        } catch (error) {
                            Alert.alert("오류", "로그아웃에 실패했습니다.");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <View style={styles.drawerContainer}>
            {/* 프로필 섹션 */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userData?.profileImage || "https://via.placeholder.com/50" }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>{userData?.name || "Guest"}</Text>
                    <TouchableOpacity>
                        <Text style={styles.editProfile}>프로필 편집</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 메뉴 아이템 */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("PlaceList")}
            >
                <Text style={styles.menuText}>여행지 찾기</Text>
            </TouchableOpacity>

            {/* 로그아웃 버튼 */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawer;


const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        padding: 20,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    editProfile: {
        color: "#6DB777",
        marginTop: 5,
    },
    menuItem: {
        marginVertical: 10,
    },
    menuText: {
        fontSize: 18,
    },
});
