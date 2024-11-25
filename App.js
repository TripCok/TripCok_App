import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import React, { useEffect, useState } from 'react';

export default function App() {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [hasOnboarded, setHasOnboarded] = useState(false);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const status = await AsyncStorage.getItem('hasOnboarded');
                console.log('온보딩 상태:', status);
                setHasOnboarded(status === 'true');
            } catch (error) {
                console.error('온보딩 상태 에러:', error);
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        checkOnboardingStatus();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                {/*<Text>Loading...</Text>*/}
            </View>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator hasOnboarded={hasOnboarded} />
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
