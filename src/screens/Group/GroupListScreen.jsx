import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HeaderComponent from "../../components/HeaderComponent";
import GroupNavigationComponent from "../../components/group/GroupNavigationComponent";
import GroupCardsComponent from "../../components/group/GroupCardsComponent";

const Drawer = createDrawerNavigator();

const GroupListScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}/>
            <GroupNavigationComponent></GroupNavigationComponent>
            <GroupCardsComponent navigation={navigation}></GroupCardsComponent>
        </View>
    );
};

export default GroupListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
