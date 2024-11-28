import React, {forwardRef, useContext, useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import {Modalize} from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import api from "../../api/api";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";


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
    const {userData, setUserData} = useContext(UserContext);
    const [localName, setLocalName] = useState(userData?.name || "");
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImage, setProfileImage] = useState(userData?.profileImage || null);

    useEffect(() => {
        if (userData?.profileImage) {
            setProfileImage(userData.profileImage);
        }
    }, [userData]);

    // 기본 프로필 이미지 선택
    const selectBaseProfileImage = async (image) => {
        try {
            // `resolveAssetSource`를 사용하여 URI 추출
            const resolvedImage = resolveAssetSource(image);
            const imageUri = resolvedImage.uri;

            // 서버에 선택된 기본 프로필 이미지 업데이트
            await updateProfileImage(imageUri);
            // UI 상태 업데이트
            setSelectedImage(image);
            setProfileImage(image);


        } catch (error) {
            console.error("기본 이미지 업데이트 실패:", error);
            alert("이미지 선택 오류, 다시 시도해주세요.");
        }
    };

    // 사용자 사진 업로드
    const pickImage = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                alert("사진 접근 권한이 필요합니다.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setSelectedImage(uri);
                await updateProfileImage(uri);
            }
        } catch (error) {
            console.error("이미지 선택 오류:", error);
            alert("이미지 선택 중 문제가 발생했습니다.");
        }
    };

    // 사용자 업로드 이미지 서버에 업데이트
    const updateProfileImage = async (uri) => {
        const formData = new FormData();
        formData.append("files", {
            uri,
            name: "profile-image.jpg",
            type: "image/jpeg",
        });

        try {
            const response = await api.put(`/member/${userData.id}/profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const updatedProfileImage = response.data.path;
                setProfileImage(updatedProfileImage);
                const updatedUserData = {...userData, profileImage: updatedProfileImage};
                setUserData(updatedUserData);
                await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
                alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
            }
        } catch (error) {
            console.error("프로필 이미지 업데이트 실패:", error);
            alert("프로필 이미지 업데이트에 실패했습니다.");
        }
    };

    // 이름 업데이트
    const handleUpdateName = async () => {
        if (!localName.trim()) {
            alert("이름을 입력해주세요.");
            return;
        }

        try {
            const response = await api.put(`/member/${userData.id}/profile-name?name=${localName}`);

            if (response.status === 200) {
                const updatedUserData = {...userData, name: localName};
                setUserData(updatedUserData);
                await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
                alert("이름이 성공적으로 업데이트되었습니다.");
            }
        } catch (error) {
            console.error("이름 업데이트 실패:", error);
            alert("이름 업데이트에 실패했습니다.");
        }
    };

    const getFullImageUrl = (filePath) => {
        const baseURL = api.defaults?.baseURL || "http://localhost:8080";
        return `${baseURL}/file?filePath=${encodeURIComponent(filePath)}`;
    };

    const renderProfileImages = ({ item }) => (
        <TouchableOpacity onPress={() => selectBaseProfileImage(item)}>
            <Image source={item} style={styles.baseProfileImage} />
        </TouchableOpacity>
    );

    return (
        <Modalize ref={ref} adjustToContentHeight>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>프로필 수정</Text>
                <View style={styles.profileImageContainer}>
                    <TouchableOpacity style={styles.profileImageBtn} onPress={pickImage}>
                        {profileImage ? (
                            <Image
                                source={
                                    typeof profileImage === "string"
                                        ? {uri: getFullImageUrl(profileImage)}
                                        : profileImage
                                }
                                style={styles.profileImage}
                            />
                        ) : (
                            <Icon name="person-circle-outline" size={100} color="#ccc"/>
                        )}
                        <Icon name="add-circle-outline" size={30} color="#6DB777" style={styles.addImageIcon}></Icon>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={profileImages}
                    renderItem={renderProfileImages}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    contentContainerStyle={styles.imageList}
                />
                <Text style={styles.modalTitle}>이름 변경</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="이름을 입력해주세요"
                    value={localName}
                    onChangeText={setLocalName}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleUpdateName}>
                    <Text style={styles.submitButtonText}>이름 저장</Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
});


export default ProfileModalComponent;


const styles = StyleSheet.create({
    modalContent: {padding: 20, paddingBottom: 60},
    modalTitle: {fontSize: 18, fontWeight: "bold", marginBottom: 20},
    profileImageContainer: {width: "100%", alignItems: "center", marginTop: 20},
    profileImageBtn: {
        width: 100,
        height: 100,
        borderRadius: 99,
        backgroundColor: "#ff2",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 99,
        objectFit: 'fill',
    },
    addImageIcon: {
        position: "absolute",
        bottom: 0,
        right: 3,
    },
    nameInput: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderColor: "#6DB777",
        borderRadius: 5,
        marginBottom: 40
    },
    submitButton: {backgroundColor: "#6DB777", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5},
    submitButtonText: {textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "500"},
    backBtn: {marginBottom: 20},

    profileBaseImgWrapper: {flex: 1, alignItems: "center", justifyContent: "center", margin: 5},
    profileBaseImg: {width: 70, height: 70, borderRadius: 99},
});
