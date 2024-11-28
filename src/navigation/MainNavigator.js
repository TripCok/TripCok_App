import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CustomDrawer from "../components/navigation/CustomDrawer";
import PlaceListScreen from "../screens/Place/PlaceListScreen";
import PlaceScreen from "../screens/Place/PlaceScreen";

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
            <Drawer.Screen name="Place" component={PlaceScreen}/>
        </Drawer.Navigator>
    );
};

export default MainNavigator;
