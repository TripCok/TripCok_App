import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OnboardingScreen1 = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TRIP</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description1}>여행의 시작은 </Text>
                <Text style={styles.description1_1}>트립콕</Text>
            </View>
            <Text style={styles.description}>
                여행지 선택부터 일정 조율까지
                {"\n"}모든 계획을 트립콕 하나로 해결하세요.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OnboardingScreen2')}
            >
                <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        position: 'relative',
    },
    title: {
        fontSize: 80,
        color: '#6DB777',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    description1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description1_1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6DB777',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 24,
    },
    button: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        height: 50,
        backgroundColor: '#6DB777',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
