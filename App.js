import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import UserProvider from "./src/context/UserProvider";
import CategoryProvider from './src/context/CategoryContext';
import OnboardingProvider from "./src/context/OnboardingContext";

export default function App() {
    return (
        <UserProvider>
            <OnboardingProvider>
                <CategoryProvider>
                    <NavigationContainer>
                        <AppNavigator/>
                    </NavigationContainer>
                </CategoryProvider>
            </OnboardingProvider>
        </UserProvider>
    );
}
