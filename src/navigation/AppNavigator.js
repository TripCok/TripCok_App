import React, {useContext, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {UserContext} from "../context/UserContext";
import OnboardingNavigator from "./OnboardingNavigator";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const {hasOnboarded, userData} = useContext(UserContext);

    useEffect(() => {
        console.log("onboarding state : " + hasOnboarded);
        console.log("user data : " + userData);
    }, [])


    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {hasOnboarded ? (
                <Stack.Screen name="Main" component={MainNavigator}/>
            ) : (
                <Stack.Screen name="Onboarding" component={OnboardingNavigator}/>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
