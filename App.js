import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import UserProvider from "./src/context/UserProvider";
import CategoryProvider from './src/context/CategoryContext';
import OnboardingProvider from "./src/context/OnboardingContext";
import {GroupProvider} from "./src/context/GroupContext";
import {GroupPlaceProvider} from "./src/context/GroupPlaceContext";

export default function App() {
    return (
        <UserProvider>
            <OnboardingProvider>
                <GroupProvider>
                    <CategoryProvider>
                        <GroupPlaceProvider>
                            <NavigationContainer>
                                <AppNavigator/>
                            </NavigationContainer>
                        </GroupPlaceProvider>
                    </CategoryProvider>
                </GroupProvider>
            </OnboardingProvider>
        </UserProvider>
    );
}
