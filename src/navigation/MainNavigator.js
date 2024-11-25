import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'; // 홈 화면 가져오기
import DrawerContent from '../components/navigation/DrawerContent';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
            drawerPosition='right'
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen}/>
        </Drawer.Navigator>
    );
};

export default MainNavigator;
