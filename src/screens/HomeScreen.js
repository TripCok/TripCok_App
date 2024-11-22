import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableOpacity>
                    <View style={styles.navLeft}>

                        <View style={styles.navLeftIcon}></View>

                        <View style={styles.navLeftText}>
                            <Text style={styles.navLeftTextTitle}>안녕하세요.</Text>
                            <Text style={styles.navLeftTextSub}>트립콕님</Text>
                        </View>


                    </View>
                </TouchableOpacity>

                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.navRightNotification}>
                        <Icon name="notifications-outline" size={25} color="#6DB777"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navRightMenu}>
                        <View style={styles.navRightBoxContainer}>
                            <View style={styles.navRightBox}></View>
                            <View style={styles.navRightBox}></View>
                        </View>
                        <View style={styles.navRightBoxContainer}>
                            <View style={styles.navRightBox}></View>
                            <View style={styles.navRightBox}></View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.contentContainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    navContainer: {
        ...Platform.select({
            ios: {
                marginTop: 60,
                paddingLeft: '20',
                paddingRight: '20',
            },
            android: {
                marginTop: 50,
                paddingLeft: '20',
                paddingRight: '20',
            },
        }),
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navLeftIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 99,
    },
    navLeftText: {
        display: 'flex',
        flexDirection: 'column',
    },
    navLeftTextTitle: {
        fontSize: 12,
        color: '#8F8C8C',
    },
    navLeftTextSub: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    navRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navRightNotification: {
        width: 40,
        height: 40,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: '#DADADA',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // x 방향 그림자
            height: 4, // y 방향 그림자
        },
        shadowOpacity: 0.3, // 그림자 투명도 (0 ~ 1)
        shadowRadius: 4, // 그림자 퍼짐 정도
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    navRightMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#6DB777',
        borderRadius: 99,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRightBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    navRightBox: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 3,
    },
});
