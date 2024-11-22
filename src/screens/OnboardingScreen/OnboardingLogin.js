import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import { useDispatch } from 'react-redux';
import { setOnboarded } from '../../store/onboardingSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        let hasError = false;

        if (!validateEmail(email)) {
            setEmailError('올바른 이메일 형식을 입력해주세요.');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) return;

        try {
            const response = await api.put('/member/login', { // 공통 baseURL 사용
                email,
                password,
            });

            if (response.status === 200) {
                await AsyncStorage.setItem('hasOnboarded', 'true'); // 상태 저장
                dispatch(setOnboarded(true));

            }
        } catch (error) {
            if (error.response) {
                // 서버가 응답했을 경우
                Alert.alert('로그인 실패', error.response.data.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
                setEmailError('이메일 또는 비밀번호가 올바르지 않습니다.');
                setPasswordError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                // 네트워크 오류 등 기타 이유
                Alert.alert('오류 발생', '네트워크 오류가 발생했습니다.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>로그인을 진행해주세요.</Text>

            <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="이메일"
                onChangeText={(text) => {
                    setEmail(text);
                    setEmailError('');
                }}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                style={[styles.input, passwordError && styles.inputError]}
                placeholder="비밀번호"
                onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                }}
                value={password}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
    },
    backButton: {
        marginTop: 40,
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        height: 50,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#dadada',
        marginBottom: 5,
    },
    inputError: {
        borderColor: '#FA6060',
    },
    errorText: {
        color: '#FA6060',
        fontSize: 14,
        marginBottom: 15,
    },
    loginButton: {
        marginLeft: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
        height: 50,
        position: 'absolute',
        bottom: 40,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
