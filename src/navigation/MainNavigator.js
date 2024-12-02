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

const Drawer = createDrawerNavigator();
const GroupStack = createStackNavigator();

const GroupStackNavigator = () => {
    return (
        <GroupStack.Navigator screenOptions={{headerShown: false, drawerPosition: "left"}}>
            <GroupStack.Screen name="GroupList" component={GroupListScreen}/>
            <GroupStack.Screen name="GroupDetails" component={GroupDetailScreen}/>
            <GroupStack.Screen name="PostDetail" component={PostDetailScreen}/>
            <GroupStack.Screen name="CommentList" component={CommentListScreen}/>
            <GroupStack.Screen name="CreatePost" component={CreatePost}/>
            <GroupStack.Screen name="GroupPlace" component={GroupPlaceScreen}/>

        </GroupStack.Navigator>
    );
};

// MainNavigator 정의
const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false, drawerPosition: "left"}}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="PlaceList" component={PlaceListScreen}/>
            <Drawer.Screen name="Place" component={PlaceScreen}/>
            <Drawer.Screen name="GroupStack" component={GroupStackNavigator}/>
            <Drawer.Screen name="GroupCreate" component={CreateGroupScreen}/>
            <Drawer.Screen name="MyGroup" component={MyGroupsScreen}/>
        </Drawer.Navigator>
    );
};

export default MainNavigator;
