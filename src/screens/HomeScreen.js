import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const loadUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            console.log('저장된 데이터:', storedData); // 저장된 데이터를 확인

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log('파싱된 사용자 데이터:', parsedData); // 파싱된 데이터를 확인
                setUserData(parsedData);
            }
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>사용자 데이터를 불러올 수 없습니다. 다시 시도해주세요.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableOpacity>
                    <View style={styles.navLeft}>
                        <View style={styles.navLeftIcon}></View>
                        <View style={styles.navLeftText}>
                            <Text style={styles.navLeftTextTitle}>안녕하세요.</Text>
                            <Text style={styles.navLeftTextSub}>{userData.name || '사용자'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.navRightNotification}>
                        <Icon name="notifications-outline" size={25} color="#6DB777"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navRightMenu}
                        onPress={() => navigation.openDrawer()}
                    >
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

            <View style={styles.contentContainer}>
                <Text>이달의 여행지</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    navContainer: {
        ...Platform.select({
            ios: {
                marginTop: 60,
            },
            android: {
                marginTop: 50,
            },
        }),
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navLeftIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 99,
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
    contentContainer: {
        flex: 1,
        padding: 20,
    },
});
