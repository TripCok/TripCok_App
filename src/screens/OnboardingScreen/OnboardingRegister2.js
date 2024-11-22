import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OnboardingRegister2 = ({ navigation }) => {
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleInputChange = (text, index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = text.slice(-1); // 하나의 숫자만 저장
        setInputs(updatedInputs);

        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus(); // 다음 인풋으로 이동
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !inputs[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // 이전 인풋으로 이동
        }
    };

    const isAllInputsFilled = inputs.every((input) => input !== '');

    const handleConfirm = () => {
        if (isAllInputsFilled) {
            console.log(`인증번호: ${inputs.join('')}`);
            navigation.navigate('OnboardingRegister3');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>인증번호를 입력해주세요.</Text>

            <View style={styles.inputContainer}>
                {inputs.map((_, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={inputs[index]}
                        onChangeText={(text) => handleInputChange(text, index)}
                        keyboardType="number-pad"
                        maxLength={1} // 한 글자만 입력
                        ref={(el) => (inputRefs.current[index] = el)} // ref 설정
                        onKeyPress={(e) => handleKeyPress(e, index)} // Backspace 처리
                    />
                ))}
            </View>

            <TouchableOpacity
                style={[styles.nextButton, !isAllInputsFilled && { backgroundColor: '#ccc' }]}
                onPress={handleConfirm}
                disabled={!isAllInputsFilled} // 입력이 다 안되면 비활성화
            >
                <Text style={styles.nextButtonText}>확인</Text>
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
