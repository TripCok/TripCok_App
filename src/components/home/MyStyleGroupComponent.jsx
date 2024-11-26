import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const {width} = Dimensions.get('window');

class MyStyleGroupComponent extends Component {
    render() {
        return (
            <View style={styles.myStyleGroupContainer}>
                <Text style={styles.myStyleGroupTitle}>🌟 나와 비슷한 여행 스타일? 🌟{'\n'}혼자보다 함께!{'\n'}지금 당신과 잘 맞는 여행 메이트를 찾아보세요!
                    👫⛺</Text>

                <View style={styles.myStyleGroupCards}>

                    <TouchableOpacity style={styles.myStyleGroupCard}>
                        <Image style={styles.myStyleGroupImg} source={require('../../assets/images/p-1.png')}></Image>
                        <View style={styles.myStyleGroupDesc}>
                            <Text style={styles.myStyleGroupCardTitle}>남해안 가서 배드민턴 칠사람?</Text>
                            <Text style={styles.myStyleGroupCardCrt}>등록일 : <Text>2일전</Text></Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.groupListBtn}>
                    <Text style={styles.groupListBtnText}>전체 모임</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MyStyleGroupComponent;

const styles = StyleSheet.create({
    myStyleGroupContainer: {
        marginTop: 25,
        width: '100%',
        alignItems: "center",
        marginBottom: 25
    },
    myStyleGroupTitle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 25
    },
    myStyleGroupCards: {
        width: '100%',
        gap: 10,
        marginBottom: 10
    },
    myStyleGroupCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 'fit-content',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',

        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,

    },
    myStyleGroupImg: {
        width: 80,
        height: 80,
    },
    myStyleGroupDesc: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    myStyleGroupCardTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    myStyleGroupCardCrt: {
        fontSize: 14,
        color: '#d2d2d2',
    },
    groupListBtn: {
        width: '100%',
        height:'50',
        paddingTop: 10,
        paddingBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,

    },
    groupListBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    }
});
