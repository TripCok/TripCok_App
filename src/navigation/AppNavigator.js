import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const AppNavigator = ({ hasOnboarded }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
