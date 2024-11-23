import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice'; // Redux 액션 가져오기
import api from '../../api/api';

const OnboardingRegister1 = ({navigation}) => {
    const [email, setEmail] = useState(''); // 로컬 상태로 이메일 관리
    const dispatch = useDispatch();
    const [isValidEmail, setValidEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!email || !validateEmail(email)) {
            setValidEmail(false);
            setErrorMessage('올바른 이메일 주소를 입력하세요.');
            return;
        }

        setValidEmail(true);
        setErrorMessage('');

        try {
            setLoading(true);
            const response = await api.get(`/member/register/${email}`);

            if (response.status === 200) {
                dispatch(updateField({field: 'email', value: email}));

                setErrorMessage('');
                navigation.navigate('OnboardingRegister2', { email }); // 이메일 전달
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage('인증 메시지 전송에 실패했습니다.');
            } else {
                setErrorMessage('네트워크 연결에 문제가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    // 이메일 유효성 검사 함수
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>이메일을 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="tripcok@example.com"
                value={email} // 입력 값을 로컬 상태와 연결
                onChangeText={setEmail} // 텍스트 입력 시 로컬 상태 업데이트
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {!isValidEmail || errorMessage ? (
                <Text style={styles.failValid}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity
                style={[styles.nextButton, (!email || loading) && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!email || loading}
            >
                <Text style={styles.nextButtonText}>{loading ? '전송 중...' : '다음'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister1;

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
    },
    nextButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
        height: 50,
        left: "30",
        position: 'absolute',
        bottom: "5%",
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
    },
    failValid: {
        color: '#FA6060'}
});
