import React, {useContext, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {UserContext} from "../context/UserContext";
import OnboardingNavigator from "./OnboardingNavigator";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const {hasOnboarded, userData} = useContext(UserContext);

    useEffect(() => {
        console.log("onboarding state:", hasOnboarded);
        console.log("user data:", JSON.stringify(userData, null, 2));
    }, [hasOnboarded, userData]);

    const shouldShowMain = hasOnboarded && userData; // 두 조건을 모두 확인

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {shouldShowMain ? (
                <Stack.Screen name="Main" component={MainNavigator}/>
            ) : (
                <Stack.Screen name="Onboarding" component={OnboardingNavigator}/>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
