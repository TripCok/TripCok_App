import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, Dimensions, TouchableOpacity, Platform, Text} from 'react-native';

const {width} = Dimensions.get('window');

class MainSlideComponent extends Component {
    render() {
        return (
            <ScrollView style={styles.slideContainer} horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.slideCard}>
                    <Image style={styles.slideCardImg} source={require('../../assets/images/m-s-1.png')}/>
                    <View style={styles.slideCarDescBox}>
                        <Text style={styles.slideCarDesc}>뚜벅이 대환영하는</Text>
                        <Text style={styles.slideCarDesc}>전국 기차 여행지</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slideCard}>
                    <Image style={styles.slideCardImg} source={require('../../assets/images/m-s-2.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slideCard}>
                    <Image style={styles.slideCardImg} source={require('../../assets/images/m-s-3.png')}/>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default MainSlideComponent;

const styles = StyleSheet.create({
    slideContainer: {
        marginTop: 10,
        width: '100%',
        borderRadius: 10,
    },
    slideCard: {
        width: width * 0.8,
        height: 250,
        marginRight: 15,
        backgroundColor: '#ececec',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    slideCardImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    slideCarDescBox: {
        padding: 20,
        position: 'absolute',
        bottom: 0,
    },
    slideCarDesc: {
        fontSize:20,
        fontWeight:500,
        color:'white',
    }
});
