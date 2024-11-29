import React, { useContext, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileModalComponent from "../components/profile/ProfileModalComponent";
import { UserContext } from "../context/UserContext";
import api from "../api/api";

export const HeaderComponent = ({ navigation }) => {
    const modalizeRef = useRef(null);
    const { userData } = useContext(UserContext);

    const openProfileModal = () => {
        modalizeRef.current?.open();
    };

    const getFullImageUrl = (filePath) => {
        const baseURL = api.defaults?.baseURL || "http://localhost:8080";
        return `${baseURL}/file?filePath=${encodeURIComponent(filePath)}`;
    };

    return (
        <>
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.navLeftMenu} onPress={openProfileModal}>
                    <View style={styles.navLeft}>
                        <Image
                            source={userData?.profileImage ? { uri: getFullImageUrl(userData.profileImage) } : require("../assets/images/b-p-1.png")}
                            style={styles.navLeftIcon}
                        />

                        <View style={styles.navLeftText}>
                            <Text style={styles.navLeftTextTitle}>안녕하세요.</Text>
                            <Text style={styles.navLeftTextSub}>{userData.name || "사용자"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.navRightNotification}>
                        <Icon name="notifications-outline" size={25} color="#6DB777" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navRightMenu} onPress={() => navigation.openDrawer()}>
                        <View style={styles.navRightBoxContainer}>
                            <View style={styles.navRightBox}></View>
                            <View style={styles.navRightBox}></View>
                        </View>
                        <View style={styles.navRightBoxContainer}>
                            <View style={styles.navRightBox}></View>
                            <View style={styles.navRightBox}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ProfileModalComponent ref={modalizeRef} />
        </>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({

    navContainer: {
        marginTop: Platform.OS === 'ios' ? 60 : 50,

        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 0
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navLeftIcon: {
        width: 45,
        height: 45,
        // backgroundColor: '#000',
        borderRadius: 99,
        borderWidth: 1,
        borderColor: '#6DB777',
    },
    navLeftText: {
        flexDirection: 'column',
    },
    navLeftTextTitle: {
        fontSize: 12,
        color: '#8F8C8C',
    },
    navLeftTextSub: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navRightNotification: {
        width: 40,
        height: 40,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: '#DADADA',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRightMenu: {
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#6DB777',
        borderRadius: 99,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRightBoxContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    navRightBox: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 3,
    },
})