import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const {width} = Dimensions.get('window');

class BestPlaceComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bestPlaceTitleBox}>
                    <Text style={styles.bestPlaceTitle}>✨ 요즘 가장 핫한 여행지! ✨</Text>
                    <Text style={styles.bestPlaceTitle}>여행자들의 선택으로 선정된</Text>
                    <Text style={styles.bestPlaceTitle}>오늘의 인기 여행지를 확인하세요! 🏖️🏙</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {/* 예시 여행지 카드 */}
                    <TouchableOpacity style={styles.placeCard}>
                        <Image style={styles.placeCardText} source={require('../../assets/images/p-1.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.placeCard}>
                        <Image style={styles.placeCardText} source={require('../../assets/images/p-2.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.placeCard}>
                        <Image style={styles.placeCardText} source={require('../../assets/images/p-3.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.placeCard}>
                        <Image style={styles.placeCardText} source={require('../../assets/images/p-1.png')}></Image>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default BestPlaceComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bestPlaceTitleBox: {
        width: '100%',
        marginBottom: 30
    },
    bestPlaceTitle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 500,
        height: "fit-content",
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 10,
    },
    placeCard: {
        width: width * 0.42, // 화면 너비의 70%
        height: 250,
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeCardText: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        objectFit: "cover"
    },
});
