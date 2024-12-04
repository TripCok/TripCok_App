import React, {useCallback, useContext, useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DraggableFlatList from "react-native-draggable-flatlist";
import api from "../../api/api";
import {UserContext} from "../../context/UserContext";

const GroupPlaceListScreen = ({route, navigation}) => {
    const {userData} = useContext(UserContext);
    const groupId = route.params.groupId;

    const [groups, setGroups] = useState([]);

    const fetchGroups = useCallback(async () => {
        try {
            const response = await api.get(`/group/place/${groupId}/all`, {
                params: {size: 100, page: 0},
            });

            if (response.status === 200) {
                setGroups(response.data.content);
            }
        } catch (error) {
            console.error(error);
        }
    }, [groupId]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const handleDragEnd = useCallback(
        async ({data}) => {
            setGroups(data);

            const groupPlaceList = data.map((item, index) => ({
                groupPlaceId: item.id,
                orders: index + 1,
            }));

            const payload = {
                memberId: userData.id,
                groupId: groupId,
                groupPlaceList: groupPlaceList,
            };

            try {
                const response = await api.put("/group/place/orders", payload);
                if (response.status === 200) {
                    fetchGroups();
                    console.log("순서 변경 성공");
                } else {
                    console.error("순서 변경 실패:", response.data);
                }
            } catch (error) {
                console.error("순서 변경 중 오류 발생:", error);
            }
        },
        [userData.id, groupId, fetchGroups]
    );

    const renderItem = useCallback(
        ({item, drag}) => (
            <TouchableOpacity
                style={styles.content}
                onLongPress={drag}
            >
                <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Icon name="menu-sharp" size={20} color="black"/>
                    <View style={styles.thumbnailContainer}>
                        <Image source={getFullImageUrl(item)} style={styles.placeThumbnail}/>
                        <Text style={{fontSize: 15}}>{item.placeName}</Text>
                    </View>
                </View>
                <Text style={{fontSize: 15}}>{item.orders}번째</Text>
            </TouchableOpacity>
        ),
        []
    );

    const getFullImageUrl = (item) => {
        if (item.placeThumbnail) {
            const baseURL = api.defaults?.baseURL || "http://localhost:8080";
            return {
                uri: `${baseURL}/file?filePath=${encodeURIComponent(item.placeThumbnail)}`,
            };
        } else {
            return require("../../assets/images/p-l-1.png");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name="chevron-back" size={30} color="black"/>
                <Text style={{fontSize: 20, fontWeight: 500}}>순서 조절</Text>
            </TouchableOpacity>
            <DraggableFlatList
                data={groups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={handleDragEnd}
                style={styles.draggableList}
            />
        </View>
    );
};

export default GroupPlaceListScreen;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        paddingTop: 60,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    thumbnailContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    placeThumbnail: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    draggableList: {
        marginTop:20,
        height: "100%",
    },
});
