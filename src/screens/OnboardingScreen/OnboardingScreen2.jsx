import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen2 = ({navigation}) => {
    const completeOnboarding = async () => {
        await AsyncStorage.setItem('hasOnboarded', 'true');
        navigation.replace('Main'); // Main 화면으로 이동
    };

    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>

                <Image source={require('../../assets/images/onboarding.png')} style={styles.image}/>

                <View style={styles.imageTextContainer}>
                    <Text style={styles.imageText}>TRIPCOK</Text>
                    <Text style={styles.imageText2}>모든 여행의 시작</Text>
                </View>

            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>반가워요!</Text>
                <Text style={styles.description}>
                    즐거운 여행이 되기를 기원합니다
                    {"\n"}오늘부터 #트립콕
                </Text>
            </View>
            <View style={styles.contentNavigation}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => navigation.navigate('OnboardingLogin')}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={() => navigation.navigate('OnboardingRegister1')}>
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default OnboardingScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: '60%',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageTextContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        fontSize: 32,
        fontWeight: 300,
        color: '#fff',
    },
    imageText2: {
        fontSize: 16,
        fontWeight: 300,
        color: '#fff',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: 500,
        marginBottom: 5,
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 40,
        color: '#A0A0A0',
    },
    button: {
        backgroundColor: '#6DB777',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    contentNavigation: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        bottom: '5%'

    }

});
