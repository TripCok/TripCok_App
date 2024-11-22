import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {updateField} from '../../store/OnboardingRegisterSlice';

const OnboardingRegister4 = ({navigation}) => {
    const dispatch = useDispatch();
    const password = useSelector((state) => state.onboardingRegister.password);
    const [localPassword, setLocalPassword] = useState(password);

    const handleNext = () => {
        if (!localPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        alert(localPassword);
        dispatch(updateField({field: 'password', value: localPassword}));
        navigation.navigate('OnboardingRegister5');
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>비밀번호를 입력해주세요.</Text>

            <TextInput style={styles.input}
                       value={localPassword}
                       onChangeText={setLocalPassword}
                       placeholder="비밀번호"/>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
