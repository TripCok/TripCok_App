import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const hasOnboarded = useSelector((state) => state.onboarding.hasOnboarded);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {hasOnboarded ? (
                <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
                <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
