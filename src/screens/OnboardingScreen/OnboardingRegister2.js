import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OnboardingRegister2 = ({navigation}) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>인증번호를 입력해주세요.</Text>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder=""/>
                <TextInput style={styles.input} placeholder=""/>
                <TextInput style={styles.input} placeholder=""/>
                <TextInput style={styles.input} placeholder=""/>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('OnboardingRegister3')}>
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>

        </View>
    );
};

export default OnboardingRegister2;

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
    inputContainer: {
        flex: 1,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        width: 70,
        height: 95,
        fontSize: 32,
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center',
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
