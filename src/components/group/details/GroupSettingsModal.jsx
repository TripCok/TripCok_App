import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity} from "react-native";
import api from "../../../api/api";
import {UserContext} from "../../../context/UserContext";

const GroupSettingsModal = ({group, visible, onClose, navigation}) => {

    const [isRecruiting, setIsRecruiting] = useState(group.recruiting);
    const {userData} = useContext(UserContext);

    const changeRecruiting = async () => {
        console.log(userData.id);
        try {
            const response = await api.put(
                `/group/${group.id}/recruiting`,
                null, // 요청 본문이 없으므로 null
                {
                    params: {
                        memberId: userData.id,
                        recruiting: !isRecruiting,
                    },
                }
            );

            if (response.status === 200) {
                setIsRecruiting(!isRecruiting); // 상태 변경
            } else {
                alert("상태 변경이 불가능합니다.");
            }
        } catch (error) {
            console.error("Error while changing recruiting status:", error);
            alert("상태 변경 중 오류가 발생했습니다.");
        }
    };

    const deleteGroup = async () => {
        try {
            const response = await api.delete(`/group/${group.id}`);

            if (response.status === 204) {
                navigation.goBack();
                alert("성공적으로 모임이 삭제되었습니다.")
            } else {
                console.error(`Unexpected status code: ${response.status}`);
                alert("그룹 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error while deleting group:", error);

            if (error.response) {
                // 서버가 에러 응답을 반환한 경우
                console.error("Server Error:", error.response.data);
                alert(error.response.data.message || "서버 오류로 인해 삭제에 실패했습니다.");
            } else if (error.request) {
                // 요청이 서버에 도달하지 못한 경우
                console.error("Network Error:", error.request);
                alert("네트워크 오류로 인해 삭제에 실패했습니다.");
            } else {
                // 기타 오류
                console.error("Error:", error.message);
                alert("예기치 않은 오류가 발생했습니다.");
            }
        }
    };


    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={styles.modal}>
                            <Text style={{fontSize: 18, fontWeight: 500, marginBottom: 20}}>설정</Text>
                            <TouchableOpacity
                                style={[styles.recruitingBtn, isRecruiting ? (styles.recruitingOn) : (styles.recruitingOff)]}
                                onPress={() => changeRecruiting()}
                            >
                                <Text style={{color: 'white', fontSize: 16, fontWeight: 500}}>모집
                                    {isRecruiting ? ("중") : ("완료")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => deleteGroup()}
                                style={[styles.recruitingBtn, {backgroundColor: '#FF3131'}]}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: 500}}>모임 삭제</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default GroupSettingsModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    }, recruitingBtn: {
        padding: 10,
        width: '60%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    recruitingOn: {
        backgroundColor: '#9BC8A1',
    },
    recruitingOff: {
        backgroundColor: '#FA6060',
    }


})