import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice'; // Redux 액션 가져오기

const OnboardingRegister1 = ({navigation}) => {
    const [email, setEmail] = useState(''); // 로컬 상태로 이메일 관리
    const dispatch = useDispatch();

    const handleNext = () => {
        if (!email || !validateEmail(email)) {
            Alert.alert('오류', '올바른 이메일 주소를 입력하세요.');
            return;
        }

        // Redux 상태 업데이트
        dispatch(updateField({field: 'email', value: email}));

        // 알림 표시 및 다음 화면으로 이동
        Alert.alert(
            '알림',
            '인증 메시지를 전송했습니다.',
            [{text: '확인', onPress: () => navigation.navigate('OnboardingRegister2')}],
            {cancelable: false}
        );
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

            <TouchableOpacity
                style={[styles.nextButton, !email && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!email}
            >
                <Text style={styles.nextButtonText}>다음</Text>
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
        bottom: "40",
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
    },
});
