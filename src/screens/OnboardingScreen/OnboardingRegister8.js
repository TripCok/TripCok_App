import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/OnboardingRegisterSlice';
import api from '../../api/api';
import { setOnboarded } from '../../store/onboardingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingRegister8 = ({ navigation }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const onboardingData = useSelector((state) => state.onboardingRegister);

    const handleNext = async () => {
        if (!address.trim()) {
            Alert.alert('오류', '주소를 입력해주세요.');
            return;
        }

        dispatch(updateField({ field: 'address', value: address }));

        setIsLoading(true); // 로딩 시작
        try {
            const response = await api.post('/member/register', {
                ...onboardingData,
                address,
            });

            if (response.status === 201) {
                Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
                await AsyncStorage.setItem('hasOnboarded', 'true');
                dispatch(setOnboarded(true));
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('회원가입 실패', error.response.data.message || '알 수 없는 오류가 발생했습니다.');
            } else {
                Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다.');
            }
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>주소를 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="서울특별시 OO구 OO동"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />

            <TouchableOpacity
                style={[styles.nextButton, !address && { backgroundColor: '#ccc' }]}
                onPress={handleNext}
                disabled={!address || isLoading} // 로딩 중에는 버튼 비활성화
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.nextButtonText}>완료</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister8;

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
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    nextButton: {
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
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
