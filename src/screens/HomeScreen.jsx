import React, {useContext, useLayoutEffect, useRef} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import MainSlideComponent from '../components/home/MainSlideComponent';
import BestPlaceComponent from "../components/home/BestPlaceComponent";
import MyStyleGroupComponent from "../components/home/MyStyleGroupComponent";
import PreferCategoryModal from "../components/home/PreferCategoryModal";
import {UserContext} from '../context/UserContext';


const HomeScreen = ({navigation}) => {
    const {userData, setUserData} = useContext(UserContext);
    const isOpenModalRef = useRef(null);

    useLayoutEffect(() => {
        if (String(userData?.isPreferCategory) === "NOT_YET") {
            if (isOpenModalRef.current) {
                isOpenModalRef.current.open();
            }
        } else if (String(userData?.isPreferCategory) === "SKIP") {
            if (isOpenModalRef.current) {
                isOpenModalRef.current.close();
            }
        }
    }, [userData]);


    if (!userData) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} userData={userData}/>
            <ScrollView style={styles.contentContainer}>
                <MainSlideComponent/>
                <View style={styles.groupNavContainer}>
                    <TouchableOpacity style={styles.groupNavBox} onPress={() => navigation.navigate('GroupCreate')}>
                        <Text style={styles.groupNavTex}>모임</Text>
                        <Text style={styles.groupNavTex}>만들기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupNavBox}
                                      onPress={() => navigation.navigate("GroupStack", {screen: "GroupList"})}>
                        <Text style={styles.groupNavTex}>모임</Text>
                        <Text style={styles.groupNavTex}>찾기</Text>
                    </TouchableOpacity>
                </View>
                <BestPlaceComponent/>
                <MyStyleGroupComponent/>
            </ScrollView>
            <PreferCategoryModal ref={isOpenModalRef}/>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    contentContainer: {
        padding: 20,

    },
    groupNavContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    groupNavBox: {
        width: '48%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        borderRadius: 10,
    },
    groupNavTex: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 500,
    }

});
