import React, {useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from "react-native";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";


const CustomDrawer = ({navigation}) => {
    const {userData, setUserData, setHasOnboarded} = useContext(UserContext);

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
                            setUserData(null);
                            setHasOnboarded(false);


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
            <View>
                {/* 프로필 섹션 */}
                <View style={styles.profileContainer}>
                    <Image
                        source={userData?.profileImage ? {uri: userData.profileImage} : require('../../assets/images/b-p-1.png')}
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
                <Text style={styles.menuItemTitle}>여행</Text>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("PlaceList")}
                >
                    <Text style={styles.menuText}>여행지 찾기</Text>
                </TouchableOpacity>

                <Text style={styles.menuItemTitle}>모임</Text>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("GroupList")}
                >
                    <Text style={styles.menuText}>모든 모임</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("PlaceCreate")}
                >
                    <Text style={styles.menuText}>모임 만들기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("MyGroup")}
                >
                    <Text style={styles.menuText}>내 모임</Text>
                </TouchableOpacity>
        </View>

    {/* 로그아웃 버튼 */
    }
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="enter-outline" size={30} color="black"/>
        <Text style={styles.logoutText}>로그아웃</Text>
    </TouchableOpacity>
</View>
)
    ;
};

export default CustomDrawer;


const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        padding: 20,
        marginTop: 40,
        marginBottom: 40,

        justifyContent: "space-between",

    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 25,

    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        objectFit: "fill",
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
        marginTop: 10

    },
    menuText: {
        fontSize: 18,
    },
    menuItemTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#6DB777",
        marginTop: 25
    },
    logoutButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }

});
