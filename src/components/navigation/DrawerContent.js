import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = ({navigation}) => {
    const [userName, setUserName] = useState('');

    const loadUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserName(parsedData.name || '사용자'); // 사용자 이름이 없을 경우 기본값
            }
        } catch (error) {
            console.error('사용자 데이터 로드 실패:', error);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <View style={styles.drawerContainer}>
            <View style={styles.profileContainer}>
                <Image
                    source={{
                        uri: 'https://via.placeholder.com/50',
                    }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>{userName}</Text>
                    <TouchableOpacity>
                        <Text style={styles.editProfile}>프로필 편집</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.hr}></View>

            <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>여행</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>여행지 찾기</Text>
                </TouchableOpacity>

                <Text style={styles.menuTitle}>모임</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>모임 만들기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>내 가입된 모임</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        padding: 30,
    },
    profileContainer: {
        marginTop: 40,
        alignItems: 'center',
        flexDirection: "row",
        marginBottom: 25,
        gap: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editProfile: {
        color: '#6DB777',
        marginTop: 5,
    },
    menuContainer: {
        flexDirection: 'column',
        gap: 20,
    },
    menuItem: {},
    menuText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#EDEDED',
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 5,
        color: '#6DB777',
    },
});
