import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../context/UserContext';
import api from '../../api/api';

const OnboardingRegister1 = ({navigation}) => {
    const {setUserData} = useContext(UserContext); // Accessing UserContext
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!email.includes('@')) {
            Alert.alert('오류', '올바른 이메일 주소를 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const response = await api.get(`/member/register/${email}`);
            if (response.status === 200) {
                setUserData((prev) => ({...prev, email})); // Update email in UserContext
                navigation.navigate('OnboardingRegister2', {email});
            }
        } catch (error) {
            Alert.alert('오류', '이메일 인증에 실패했습니다.');
        } finally {
            setLoading(false);
        }
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
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loading}>
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
        color: '#FA6060'
    }
});
