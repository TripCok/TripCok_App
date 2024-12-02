import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const PostDetailScreen = ({navigation, postId}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <Icon name='arrow-back' size={30} color="black"/>
            </TouchableOpacity>
        </View>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 66,
        paddingHorizontal:20
    }
})