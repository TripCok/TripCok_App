import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // 홈 화면 컴포넌트 가져오기

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    );
};

export default MainNavigator;
