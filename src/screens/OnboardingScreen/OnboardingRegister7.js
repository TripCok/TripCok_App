import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../context/UserContext';

const OnboardingRegister7 = ({ navigation }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [selectedGender, setSelectedGender] = useState(userData?.gender || null);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleNext = () => {
        setUserData({ ...userData, gender: selectedGender });
        navigation.navigate('OnboardingRegister8');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>성별을 선택해주세요.</Text>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={[
                        styles.selectBtnLeft,
                        selectedGender === 'MALE' && styles.selectBtn,
                    ]}
                    onPress={() => handleGenderSelect('MALE')}
                >
                    <Text
                        style={[
                            styles.btnText,
                            selectedGender === 'MALE' && styles.selectBtnText,
                        ]}
                    >
                        남성
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.selectBtnRight,
                        selectedGender === 'FEMALE' && styles.selectBtn,
                    ]}
                    onPress={() => handleGenderSelect('FEMALE')}
                >
                    <Text
                        style={[
                            styles.btnText,
                            selectedGender === 'FEMALE' && styles.selectBtnText,
                        ]}
                    >
                        여성
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.nextButton, !selectedGender && { backgroundColor: '#ccc' }]}
                onPress={handleNext}
                disabled={!selectedGender}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingRegister7;

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
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectBtnLeft: {
        width: '50%',
        height: 50,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dadada',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtnRight: {
        width: '50%',
        height: 50,
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: '#dadada',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtn: {
        backgroundColor: '#6DB777',
        borderColor: '#6DB777',
    },
    selectBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    nextButton: {
        marginLeft: 30,
        width: '100%',
        display: 'flex',
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
