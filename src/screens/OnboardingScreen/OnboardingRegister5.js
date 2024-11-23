import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice';

const OnboardingRegister5 = ({navigation}) => {
    const dispatch = useDispatch();
    const phone = useSelector((state) => state.onboardingRegister.phone);
    const [localPhone, setLocalPhone] = useState(phone);

    const handlePhoneInput = (text) => {
        const numericText = text.replace(/[^0-9]/g, ''); // 숫자만 추출
        if (numericText.length > 11) return; // 최대 11자리까지만 입력 허용
        const formattedPhone = formatPhoneNumber(numericText);
        setLocalPhone(formattedPhone);
    };

    const formatPhoneNumber = (number) => {
        if (number.length <= 3) return number;
        if (number.length <= 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
        return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    };

    const handleNext = () => {
        if (!localPhone) {
            alert('전화번호를 입력해주세요.');
            return;
        }
        console.log(`전화번호 : ${localPhone}`);
        dispatch(updateField({field: 'phone', value: localPhone}));
        navigation.navigate('OnboardingRegister6');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>휴대폰 번호를 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="휴대폰 번호"
                value={localPhone}
                onChangeText={handlePhoneInput}
            />

            <TouchableOpacity
                style={[styles.nextButton, !localPhone && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!localPhone}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister5;


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
