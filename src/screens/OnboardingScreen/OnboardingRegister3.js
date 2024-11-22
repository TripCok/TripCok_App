import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice';

const OnboardingRegister3 = ({navigation}) => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.onboardingRegister.name); // Redux에서 상태 가져오기
    const [localName, setLocalName] = useState(name); // 초기값 설정

    const handleNext = () => {
        if (!localName) {
            alert('이름을 입력해주세요.');
            return;
        }
        console.log(`이름 : ${localName}`);
        dispatch(updateField({field: 'name', value: localName})); // Redux 상태 업데이트
        navigation.navigate('OnboardingRegister4');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>이름을 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="트립콕"
                value={localName}
                onChangeText={setLocalName}
            />

            <TouchableOpacity
                style={[styles.nextButton, !localName && {backgroundColor: '#ccc'}]}
                onPress={handleNext}
                disabled={!localName}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister3;

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
