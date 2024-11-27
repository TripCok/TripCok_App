import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { OnboardingContext } from '../../context/OnboardingContext';

const OnboardingRegister4 = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [localPassword, setLocalPassword] = useState(onboardingData?.password || '');

    const handleNext = () => {
        if (!localPassword || localPassword.length < 6) {
            Alert.alert('오류', '비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        updateOnboardingData('password', localPassword);
        navigation.navigate('OnboardingRegister5');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>비밀번호를 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={localPassword}
                onChangeText={setLocalPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.nextButton, !localPassword && { backgroundColor: '#ccc' }]}
                onPress={handleNext}
                disabled={!localPassword}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister4;


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
