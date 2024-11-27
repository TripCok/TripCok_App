import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderComponent from "../../components/HeaderComponent";


const PlaceListScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderComponent></HeaderComponent>
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
