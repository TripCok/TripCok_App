import React, {useContext, useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {UserContext} from "../../context/UserContext";
import api from "../../api/api";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingLogin = ({navigation}) => {
    const {setUserData, setHasOnboarded} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const validateFields = () => {
        let isValid = true;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("유효한 이메일 주소를 입력해주세요.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password || password.length < 6) {
            setPasswordError("비밀번호는 최소 6자 이상이어야 합니다.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateFields()) return;

        try {
            setLoading(true);
            const response = await api.put("/member/login", {email, password});

            if (response.status === 200) {
                const userData = response.data;
                await AsyncStorage.setItem("userData", JSON.stringify(userData));
                setUserData(userData);
                setHasOnboarded(true);

                Alert.alert("로그인 성공", "로그인에 성공했습니다.");
            }
        } catch (error) {
            Alert.alert("로그인 실패", "이메일 또는 비밀번호가 올바르지 않습니다.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>

            <Text style={styles.title}>로그인을 진행해주세요.</Text>

            <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="이메일"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                style={[styles.input, passwordError && styles.inputError]}
                placeholder="비밀번호"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError("");
                }}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity
                style={[styles.loginButton, loading && {backgroundColor: "#ccc"}]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff"/>
                ) : (
                    <Text style={styles.loginButtonText}>로그인</Text>
                )}
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
