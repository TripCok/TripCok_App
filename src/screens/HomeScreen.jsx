import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import MainSlideComponent from '../components/home/MainSlideComponent';
import BestPlaceComponent from "../components/home/BestPlaceComponent";
import MyStyleGroupComponent from "../components/home/MyStyleGroupComponent";

const HomeScreen = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
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
            <HeaderComponent navigation={navigation} userData={userData}/>
            <ScrollView style={styles.contentContainer}>
                <MainSlideComponent/>
                <View style={styles.groupNavContainer}>
                    <TouchableOpacity style={styles.groupNavBox} onPress={() => navigation.navigate('GroupCreate')}>
                        <Text style={styles.groupNavTex}>모임{'\n'}만들기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupNavBox} onPress={() => navigation.navigate("GroupStack", { screen: "GroupList" })}>
                        <Text style={styles.groupNavTex}>모임{'\n'}찾기</Text>
                    </TouchableOpacity>
                </View>
                <BestPlaceComponent/>
                <MyStyleGroupComponent/>
            </ScrollView>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    contentContainer: {
        padding: 20,

    }, bestPlaceBtn: {
        marginTop: 20,
        width: '100%',
        height: 50,
        padding: 5,
        backgroundColor: '#6DB777',
        borderRadius: 10,
        justifyContent: 'center'
    },
    bestPlaceText: {
        color: '#fff',
        fontWeight: 500,
        fontSize: 16,
    },
    groupNavContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    groupNavBox: {
        width: '48%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
    },
    groupNavTex: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 500,
    }

});
