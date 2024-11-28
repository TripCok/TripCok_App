import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CategoryContext } from '../../context/CategoryContext';
import CategoryModal from './CategoryModal';
import api from "../../api/api";

const PlaceNavigation = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { selectedCategories, addCategory, removeCategory } = useContext(CategoryContext);

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
                <TouchableOpacity style={styles.iconWrap}>
                    <Icon name="filter-outline" size={24} color="#6DB777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryFilter} onPress={() => setModalVisible(true)}>
                    <Text style={styles.categoryFilterText}>카테고리</Text>
                </TouchableOpacity>
                {selectedCategories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.selectedCategory}
                        onPress={() => removeCategory(category)}
                    >
                        <Text style={styles.selectedCategoryText}>{category.name}</Text>
                        <Icon name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <CategoryModal
                visible={modalVisible}
                setVisible={setModalVisible}
                fetchCategories={fetchCategories}
                selectedCategories={selectedCategories}
                onSave={(selected) => {
                    selected.forEach(addCategory);
                }}
            />
        </View>
    );
};

export default PlaceNavigation;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    iconWrap: {
        paddingHorizontal: 10,
    },
    categoryFilter: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6DB777',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryFilterText: {
        color: '#6DB777',
        fontSize: 16,
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
