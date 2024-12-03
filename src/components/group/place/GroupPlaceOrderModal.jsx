import React from 'react';
import {StyleSheet, Modal, TouchableOpacity, View, Text} from "react-native";

const GroupPlaceOrderModal = ({isVisible, toggleModal}) => {
    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>순서 조절</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>닫기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default GroupPlaceOrderModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: "center",
    },
    closeButtonText: {
        color: "#007BFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
