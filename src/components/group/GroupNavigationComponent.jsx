import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Text} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryModal from "../place/CategoryModal";
import {CategoryContext} from "../../context/CategoryContext";
import api from "../../api/api";

const GroupNavigationComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {selectedCategories, addCategories, removeCategory} = useContext(CategoryContext);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/place/category/all');
            return response.data;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return [];
        }
    };

    return (
        <View>
            <ScrollView horizontal style={styles.container}>
                <TouchableOpacity
                    style={styles.filterIconWrap}
                    onPress={() => setModalVisible(true)} // 모달 열기
                >
                    <View>
                        <Icon name="filter-outline" size={24} color="#6DB777"/>
                    </View>
                    <Text>카테고리</Text>
                </TouchableOpacity>
                {selectedCategories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.selectedCategory}
                        onPress={() => removeCategory(category)}
                    >
                        <Text style={styles.selectedCategoryText}>{category.name}</Text>
                        <Icon name="close" size={16} color="#fff"/>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <CategoryModal
                visible={modalVisible}
                setVisible={setModalVisible}
                fetchCategories={fetchCategories}
                selectedCategories={selectedCategories}
                onSave={(selected) => {
                    console.log("저장된 카테고리:", selected); // 선택된 카테고리 확인
                    addCategories(selected); // 여러 카테고리를 한 번에 추가
                }}
            />
        </View>
    );
};

export default GroupNavigationComponent;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 30,
        marginBottom: 10
    },
    filterIconWrap: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginRight: 10,
    },
    selectedCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6DB777',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    selectedCategoryText: {
        color: '#fff',
        fontsize: 16,
        marginRight: 5,
    },
});
