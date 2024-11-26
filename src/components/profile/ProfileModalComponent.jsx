import React, { forwardRef } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";

const profileImages = [
    require("../../assets/images/b-p-1.png"),
    require("../../assets/images/b-p-2.png"),
    require("../../assets/images/b-p-3.png"),
    require("../../assets/images/b-p-4.png"),
    require("../../assets/images/b-p-5.png"),
    require("../../assets/images/b-p-6.png"),
    require("../../assets/images/b-p-7.png"),
    require("../../assets/images/b-p-8.png"),
];

const ProfileModalComponent = forwardRef((props, ref) => {
    const renderHeader = () => (
        <View>
            {/* 뒤로 가기 버튼 */}
            <TouchableOpacity style={styles.backBtn} onPress={() => ref.current?.close()}>
                <Icon name="arrow-back-outline" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>프로필 수정</Text>

            {/* 프로필 이미지 */}
            <View style={styles.profileImageContainer}>
                <TouchableOpacity style={styles.profileImageBtn}>
                    <Icon name="person-circle-outline" size={80} color="#ccc" />
                    <View style={styles.addImageIcon}>
                        <Icon name="add-circle" size={25} color="#6DB777" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View>
            <Text style={styles.modalTitle}>이름</Text>
            <TextInput style={styles.nameInput} placeholder="홍길동" />
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>편집 완료</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.profileBaseImgWrapper}>
            <TouchableOpacity>
                <Image style={styles.profileBaseImg} source={item} resizeMode="cover" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Modalize
            ref={ref}
            adjustToContentHeight={true}
            flatListProps={{
                data: profileImages,
                keyExtractor: (_, index) => index.toString(),
                numColumns: 4,
                contentContainerStyle: styles.modalContent,
                ListHeaderComponent: renderHeader,
                renderItem: renderItem,
                ListFooterComponent: renderFooter,
            }}
        />
    );
});

export default ProfileModalComponent;

const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        paddingBottom: 60,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    profileImageBtn: {
        width: 80,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    addImageIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    nameInput: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderColor: "#6DB777",
        borderRadius: 5,
        marginBottom: 40,
    },
    submitButton: {
        backgroundColor: "#6DB777",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    submitButtonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    backBtn: {
        marginBottom: 20,
    },
    profileImageContainer: {
        width: "100%",
        alignItems: "center",
    },
    profileBaseImgWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    profileBaseImg: {
        width: 70,
        height: 70,
        borderRadius: 99,
    },
});
