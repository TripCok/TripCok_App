import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderComponent from "../../components/HeaderComponent";
import PlaceNavigation from "../../components/place/PlaceNavigation";
import PlaceCards from "../../components/place/PlaceCards";


const PlaceListScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}></HeaderComponent>
            <PlaceNavigation></PlaceNavigation>
            <PlaceCards navigation={navigation}></PlaceCards>
        </View>
    );
};

export default PlaceListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
