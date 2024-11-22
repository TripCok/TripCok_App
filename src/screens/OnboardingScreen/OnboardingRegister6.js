import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice';

const OnboardingRegister6 = ({navigation}) => {
    const dispatch = useDispatch();
    const [birthdate, setBirthdate] = useState('');

    const formatDate = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        // const cleaned = text;
        if (cleaned.length <= 4) {
            return cleaned;
        } else if (cleaned.length <= 6) {
            return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
        } else {
            return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
        }
    };

    const handleNext = () => {
        if (!birthdate || !/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
            Alert.alert('오류', '유효한 날짜 형식(YYYY-MM-DD)으로 입력해주세요.');
            return;
        }
        console.log(`생년월일 : ${birthdate}`);
        dispatch(updateField({field: 'birthdate', value: birthdate}));

        navigation.navigate('OnboardingRegister7');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>

            <Text style={styles.title}>생년월일을 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={birthdate}
                onChangeText={(text) => setBirthdate(formatDate(text))} // 자동 하이픈 추가
                keyboardType="number-pad"
                maxLength={10} // YYYY-MM-DD 형식 길이 제한
            />

            <TouchableOpacity
                style={[styles.nextButton, !birthdate && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!birthdate}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister6;

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
