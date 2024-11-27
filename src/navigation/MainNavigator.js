import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CustomDrawer from "../components/navigation/CustomDrawer";
import PlaceListScreen from "../screens/Place/PlaceListScreen";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="PlaceList" component={PlaceListScreen}/>
        </Drawer.Navigator>
    );
};

export default MainNavigator;
