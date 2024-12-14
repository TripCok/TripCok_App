import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Button} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const OnboardingRegisterV2 = () => {

    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Icon name="arrow-back-outline" style={styles.backBtn} size={33}/>
            </TouchableOpacity>
            <Text style={styles.registerTitle1}>회원가입</Text>
            <Text style={styles.registerTitle2}>안내</Text>

            <View style={styles.inputSection}>
                <TextInput
                    placeholder="이메일을 입력해주세요."
                    style={styles.inputEmail}
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>

                {email ? (
                    <TouchableOpacity style={styles.checkEmail}>
                        <Text style={styles.checkEmailText}>인증 메시지 전송</Text>
                    </TouchableOpacity>
                ) : null}




                {/*<TextInput placeholder="이메일을 입력해주세요." style={styles.inputEmail}></TextInput>*/}

        </View>

</View>
)
    ;
};

export default OnboardingRegisterV2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20
    },
    backBtn: {
        paddingTop: 20,
        color: '#6DB777'
    },
    registerTitle1: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: 600,
    },
    registerTitle2: {
        fontSize: 32,
        fontWeight: 600,
    },
    inputSection: {
        paddingVertical: 20,
    },
    inputEmail: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderColor: '#d2d2d2',
    },
    checkEmail: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#6DB777',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    checkEmailText: {
        fontSize: 18,
        fontWeight: 400,
        color: 'white',

    }


})