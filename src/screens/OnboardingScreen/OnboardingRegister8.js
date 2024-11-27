import React, {useState, useContext} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../context/UserContext';
import api from '../../api/api';

const OnboardingRegister8 = ({navigation}) => {
    const {userData, setUserData} = useContext(UserContext);
    const [address, setAddress] = useState(userData?.address || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = async () => {
        if (!address.trim()) {
            Alert.alert('오류', '주소를 입력해주세요.');
            return;
        }

        setUserData({...userData, address});

        setIsLoading(true);
        try {
            const response = await api.post('/member/register', {...userData, address});

            if (response.status === 201) {
                Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
                navigation.reset({index: 0, routes: [{name: 'Home'}]});
            }
        } catch (error) {
            Alert.alert('오류', '회원가입에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>주소를 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="서울특별시 OO구 OO동"
                value={address}
                onChangeText={setAddress}
            />

            <TouchableOpacity
                style={[styles.nextButton, (!address || isLoading) && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!address || isLoading}
            >
                {isLoading ? <ActivityIndicator size="small" color="#fff"/> :
                    <Text style={styles.nextButtonText}>완료</Text>}
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
