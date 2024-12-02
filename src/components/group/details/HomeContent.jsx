import React from 'react';
import {StyleSheet, ScrollView, View, Text, Image} from "react-native";
import GroupMembersComponent from "./GroupMembersComponent";

const HomeContent = ({item}) => (
    <View style={styles.homeContent}>
        <Image source={{uri: "https://via.placeholder.com/150"}} style={styles.groupThumbnail}/>
        <ScrollView horizontal style={styles.groupCategoriesBox}>
            <View style={styles.groupCategoryBox}>
                <Text style={styles.groupCategoryText}>맴버 {item.groupMemberCount || 0}명</Text>
            </View>
            <View style={styles.groupCategoryBox}>
                <Text style={styles.groupCategoryText}>모집 {item.recruiting ? "ON" : "OFF"}</Text>
            </View>
            {item.categories && item.categories.length > 0 && item.categories.map((c) => (
                <View key={c.id} style={styles.groupCategoryBox}>
                    <Text style={styles.groupCategoryText}>{c.name}</Text>
                </View>
            ))}
        </ScrollView>
        <Text style={styles.groupDesc}>{item.description}</Text>
        <GroupMembersComponent item={item.members || []}/>
    </View>
);

export default HomeContent;

const styles = StyleSheet.create({
    groupThumbnail: {
        marginTop: 20,
        width: "100%",
        height: 200,
    },
    groupCategoriesBox: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
    },
    groupCategoryBox: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6DB777",
        marginRight: 10
    },
    groupCategoryText: {
        fontSize: 14,
        fontWeight: 500
    },
    groupDesc: {
        fontSize: 16,
        fontWeight: 400,
        width: "100%",
        borderColor: "#dadada",
        paddingBottom: 20,
        borderBottomWidth: 2

    },
})