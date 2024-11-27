import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import { UserContext } from '../../context/UserContext';

const OnboardingRegister2 = ({ navigation, route }) => {
    const { email } = route.params; // Email passed from previous screen
    const { setUserData } = useContext(UserContext); // Access UserContext to manage user state
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [isFailed, setIsFailed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleInputChange = (text, index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = text.slice(-1); // Only keep the last character
        setInputs(updatedInputs);

        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus(); // Move to next input
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !inputs[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // Move to previous input
        }
    };

    const isAllInputsFilled = inputs.every((input) => input !== '');

    const handleConfirm = async () => {
        if (!isAllInputsFilled) return;

        const code = inputs.join('');
        setLoading(true);
        try {
            const response = await api.get('/member/register/email/check', {
                params: { email, code },
            });

            if (response.status === 200) {
                Alert.alert('성공', '인증이 완료되었습니다.');
                navigation.navigate('OnboardingRegister3');
            }
        } catch (error) {
            if (error.response) {
                setIsFailed(true);
            } else {
                Alert.alert('오류', '잠시후 다시 시도 해주세요.');
            }
        } finally {
            setLoading(false);
        }
    };

    const retrySendCode = async () => {
        setIsFailed(false);
        setInputs(['', '', '', '']);
        setResending(true);

        try {
            const response = await api.get(`/member/register/${email}`);
            if (response.status === 200) {
                Alert.alert('성공', '인증 코드가 다시 전송되었습니다.');
            }
        } catch (error) {
            Alert.alert('오류', '인증 코드를 다시 전송하는 데 실패했습니다.');
        } finally {
            setResending(false);
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
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                ))}
            </View>
            {isFailed && (
                <View style={styles.failCommentBox}>
                    <Text style={styles.failComment}>인증 번호를 다시 확인해주세요.</Text>
                    <TouchableOpacity onPress={retrySendCode} disabled={resending}>
                        <Text style={[styles.retryBtn, resending && { color: '#ccc' }]}>
                            {resending ? '재전송 중...' : '재전송'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                style={[styles.nextButton, (!isAllInputsFilled || loading) && { backgroundColor: '#ccc' }]}
                onPress={handleConfirm}
                disabled={!isAllInputsFilled || loading}
            >
                <Text style={styles.nextButtonText}>{loading ? '확인 중...' : '확인'}</Text>
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
    failCommentBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    nextButton: {
        marginLeft:30,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
        height: 50,
        position: 'absolute',
        bottom: "5%",
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    retryBtn: {
        color: '#FA6060',
    },
    failComment: {
        color: '#FA6060',
    },
});
