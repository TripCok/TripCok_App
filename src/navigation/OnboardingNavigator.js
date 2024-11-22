import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import OnboardingScreen1 from '../screens/OnboardingScreen/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen/OnboardingScreen2';
import OnboardingLogin from '../screens/OnboardingScreen/OnboardingLogin';
import OnboardingRegister1 from "../screens/OnboardingScreen/OnboardingRegister1";
import OnboardingRegister2 from "../screens/OnboardingScreen/OnboardingRegister2";
import OnboardingRegister3 from "../screens/OnboardingScreen/OnboardingRegister3";
import OnboardingRegister4 from "../screens/OnboardingScreen/OnboardingRegister4";
import OnboardingRegister5 from "../screens/OnboardingScreen/OnboardingRegister5";
import OnboardingRegister6 from "../screens/OnboardingScreen/OnboardingRegister6";
import OnboardingRegister7 from "../screens/OnboardingScreen/OnboardingRegister7";
import OnboardingRegister8 from "../screens/OnboardingScreen/OnboardingRegister8";

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1}/>
            <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2}/>
            <Stack.Screen name="OnboardingLogin" component={OnboardingLogin}/>
            <Stack.Screen name="OnboardingRegister1" component={OnboardingRegister1}/>
            <Stack.Screen name="OnboardingRegister2" component={OnboardingRegister2}/>
            <Stack.Screen name="OnboardingRegister3" component={OnboardingRegister3}/>
            <Stack.Screen name="OnboardingRegister4" component={OnboardingRegister4}/>
            <Stack.Screen name="OnboardingRegister5" component={OnboardingRegister5}/>
            <Stack.Screen name="OnboardingRegister6" component={OnboardingRegister6}/>
            <Stack.Screen name="OnboardingRegister7" component={OnboardingRegister7}/>
            <Stack.Screen name="OnboardingRegister8" component={OnboardingRegister8}/>

        </Stack.Navigator>
    );
};

export default OnboardingNavigator;
