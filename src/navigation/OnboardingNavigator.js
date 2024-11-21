import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import OnboardingScreen1 from '../screens/OnboardingScreen/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen/OnboardingScreen2';
import OnboardingLogin from '../screens/OnboardingScreen/OnboardingLogin';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
      <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
      <Stack.Screen name="OnboardingLogin" component={OnboardingLogin} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
