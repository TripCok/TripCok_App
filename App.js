import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import UserProvider from "./src/context/UserProvider";
import CategoryProvider from './src/context/CategoryContext';
import OnboardingProvider from "./src/context/OnboardingContext";
import {GroupProvider} from "./src/context/GroupContext";

export default function App() {
    return (
        <UserProvider>
            <OnboardingProvider>
                <GroupProvider>
                    <CategoryProvider>
                        <NavigationContainer>
                            <AppNavigator/>
                        </NavigationContainer>
                    </CategoryProvider>
                </GroupProvider>
            </OnboardingProvider>
        </UserProvider>
    );
}
