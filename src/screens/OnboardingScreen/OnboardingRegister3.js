import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../context/UserContext';

const OnboardingRegister3 = ({ navigation }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [localName, setLocalName] = useState(userData?.name || ''); // Initialize with existing data or empty string

    const handleNext = () => {
        if (!localName) {
            Alert.alert('오류', '이름을 입력해주세요.');
            return;
        }

        setUserData({ ...userData, name: localName }); // Update name in context
        navigation.navigate('OnboardingRegister4');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>이름을 입력해주세요.</Text>

            <TextInput
                style={styles.input}
                placeholder="트립콕"
                value={localName}
                onChangeText={setLocalName}
            />

            <TouchableOpacity
                style={[styles.nextButton, !localName && { backgroundColor: '#ccc' }]}
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
        bottom: "5%",
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
    },
});
