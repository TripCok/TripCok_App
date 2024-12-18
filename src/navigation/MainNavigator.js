import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CustomDrawer from "../components/navigation/CustomDrawer";
import PlaceListScreen from "../screens/Place/PlaceListScreen";
import PlaceScreen from "../screens/Place/PlaceScreen";
import CreateGroupScreen from "../screens/Group/CreateGroupScreen";
import GroupListScreen from "../screens/Group/GroupListScreen";
import MyGroupsScreen from "../screens/Group/MyGroupsScreen";
import GroupDetailScreen from "../screens/Group/GroupDetailScreen";
import PostDetailScreen from "../screens/Group/PostDetailScreen";
import CommentListScreen from "../screens/Group/CommentListScreen";
import CreatePost from "../screens/Group/CreatePostScreen";
import GroupPlaceScreen from "../screens/Group/GroupPlaceScreen";
import GroupPlaceListScreen from "../screens/Group/GroupPlaceListScreen";
import PreferCategoryScreen from "../screens/PreferCategoryScreen";

const Drawer = createDrawerNavigator();
const GroupStack = createStackNavigator();
const PlaceStack = createStackNavigator();

const GroupStackNavigator = () => {
    return (
        <GroupStack.Navigator screenOptions={{headerShown: false, drawerPosition: "left"}}>
            <GroupStack.Screen name="GroupList" component={GroupListScreen}/>
            <GroupStack.Screen name="GroupDetails" component={GroupDetailScreen}/>
            <GroupStack.Screen name="PostDetail" component={PostDetailScreen}/>
            <GroupStack.Screen name="CommentList" component={CommentListScreen}/>
            <GroupStack.Screen name="CreatePost" component={CreatePost}/>
            <GroupStack.Screen name="GroupPlace" component={GroupPlaceScreen}/>
            <GroupStack.Screen name="GroupPlaceList" component={GroupPlaceListScreen}/>
        </GroupStack.Navigator>
    );
};

const PlaceStackNavigator = () => {
    return (
        <PlaceStack.Navigator screenOptions={{headerShown: false, drawerPosition: "left"}}>
            <PlaceStack.Screen name="PlaceList" component={PlaceListScreen}/>
            <PlaceStack.Screen name="Place" component={PlaceScreen}/>
        </PlaceStack.Navigator>
    )
}

// MainNavigator 정의
const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false, drawerPosition: "left"}}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="PreferCategoryScreen" component={PreferCategoryScreen}/>
            <Drawer.Screen name="PlaceStack" component={PlaceStackNavigator}/>
            <Drawer.Screen name="GroupStack" component={GroupStackNavigator}/>
            <Drawer.Screen name="GroupCreate" component={CreateGroupScreen}/>
            <Drawer.Screen name="MyGroup" component={MyGroupsScreen}/>
        </Drawer.Navigator>
    );
};

export default MainNavigator;
