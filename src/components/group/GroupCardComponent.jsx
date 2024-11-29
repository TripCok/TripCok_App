import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const GroupCardComponent = ({navigation, item}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("GroupDetails", {item: item})}
        >

            <Image source={{uri: "https://via.placeholder.com/150"}} style={styles.groupImage}/>

            <View style={styles.groupDescBox}>
                <Text style={styles.groupTitle}>{item.groupName}</Text>
                <View style={{display: "flex", flexDirection: "row", gap: 5, marginVertical: 5}}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
                        <Icon name="people-sharp" size={16} color="#6DB777"/>
                        <Text> {item.groupMemberCount}</Text>
                    </View>
                    <View style={{flexDirection: "row", gap: 5}}>
                        <Icon name="enter" size={16} color="#6DB777"/>
                        {item.recruiting ?
                            <Text>OPEN</Text> :
                            <Text>Close</Text>
                        }
                    </View>
                </View>
                <ScrollView horizontal style={styles.categoriesContainer}>
                    {
                        item.categories.map((item, index) => (
                            <View style={styles.groupCategoryContainer} key={item.id}>
                                <Text style={styles.groupCategoryText}>{item.name}</Text>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>

        </TouchableOpacity>
    );
};

export default GroupCardComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
        height: 120,
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        gap: 10,
        marginBottom: 10
    },
    groupImage: {
        width: "120",
        height: "120",
        borderRadius: 10,
    },
    groupDescBox: {
        display: "flex",
        padding: 5
    },
    groupTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "600",
    },
    categoriesContainer: {
        height: 30
    },
    groupCategoryContainer: {
        height: 30,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6DB777",
        marginRight: 10,
        borderRadius: 10,
    },
    groupCategoryText: {
        fontSize: 12,
        fontWeight: 500,
        color: "white",
    }

})