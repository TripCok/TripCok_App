import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const GroupMembersComponent = ({item}) => {


    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>모임 맴버</Text>
            {
                item.map((member) => (
                    <View key={member.id} style={styles.memberCard}>
                        <Image
                            style={styles.profileImage}
                            source={
                                member.profileImage
                                    ? {uri: member.profileImage}
                                    : require("../../../assets/images/b-p-1.png")
                            }
                        />
                        <Text style={styles.name}>{member.name}</Text>
                    </View>
                ))
            }
        </View>
    );
};

export default GroupMembersComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        height: '100%',
    },
    containerText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20
    },
    memberCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#6DB777',
        marginRight: 20,
    },
    name: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
    }
})