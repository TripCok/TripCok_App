import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryModal from "../place/CategoryModal";
import api from "../../api/api";

const GroupNavigationComponent = ({categories, setCategories}) => {
    const [modalVisible, setModalVisible] = useState(false);

    // 카테고리 추가
    const handleSave = (selected) => {
        const uniqueCategories = [...categories, ...selected].filter(
            (category, index, self) =>
                index === self.findIndex((t) => t.id === category.id)
        ); // 중복 제거
        console.log("Updated Categories:", uniqueCategories);
        setCategories(uniqueCategories);
    };

    return (
        <View>
            <ScrollView horizontal style={styles.container}>
                {/* 필터 아이콘 */}
                <TouchableOpacity
                    style={styles.filterIconWrap}
                    onPress={() => setModalVisible(true)} // 모달 열기
                >
                    <View>
                        <Icon name="filter-outline" size={24} color="#6DB777"/>
                    </View>
                    <Text>카테고리</Text>
                </TouchableOpacity>

                {/* 선택된 카테고리 표시 */}
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.selectedCategory}
                            onPress={() => {
                                // 선택된 카테고리 제거
                                setCategories(categories.filter((cat) => cat.id !== category.id));
                            }}
                        >
                            <Text style={styles.selectedCategoryText}>{category.name}</Text>
                            <Icon name="close" size={16} color="#fff"/>
                        </TouchableOpacity>
                    ))
                ) : (
                    <></>
                )}
            </ScrollView>

            {/* 카테고리 선택 모달 */}
            <CategoryModal
                visible={modalVisible}
                setVisible={setModalVisible}
                fetchCategories={async () => {
                    try {
                        const response = await api.get('/place/category/all');
                        return response.data;
                    } catch (error) {
                        console.error("Failed to fetch categories:", error);
                        return []; // 기본적으로 빈 배열 반환
                    }
                }}
                selectedCategories={categories}
                onSave={handleSave}
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
