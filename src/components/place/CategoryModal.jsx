import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';

const CategoryModal = ({visible, setVisible, fetchCategories, selectedCategories, onSave}) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (visible) {
            loadCategories();
            syncSelectedCategories();
        }
    }, [visible]);

    const syncSelectedCategories = () => {
        const selectedIds = selectedCategories.map((category) => category.id);
        setSelectedSubCategories(selectedIds);
    };

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSubCategorySelection = (categoryId) => {
        setSelectedSubCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSave = () => {
        const selectedItems = findSelectedCategories(categories, selectedSubCategories);
        onSave(selectedItems); // 부모 컴포넌트로 전달
        setSelectedCategory(null); // 선택된 카테고리 초기화
        setVisible(false); // 모달 닫기
    };

// 모든 카테고리를 재귀적으로 탐색하여 선택된 항목 찾기
    const findSelectedCategories = (allCategories, selectedIds) => {
        let results = [];

        allCategories.forEach((category) => {
            if (selectedIds.includes(category.id)) {
                results.push(category);
            }
            if (category.children && category.children.length > 0) {
                results = results.concat(findSelectedCategories(category.children, selectedIds));
            }
        });

        return results;
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {selectedCategory ? `카테고리: ${selectedCategory.name}` : '카테고리 선택'}
                            </Text>
                            {loading ? (
                                <ActivityIndicator size="large" color="#6DB777"/>
                            ) : (
                                <FlatList
                                    data={selectedCategory ? selectedCategory.children : categories}
                                    keyExtractor={(item) => item.id.toString() + (selectedCategory ? '-child' : '-parent')}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.categoryItem,
                                                selectedSubCategories.includes(item.id) && styles.categoryItemCheck,
                                            ]}
                                            onPress={() =>
                                                selectedCategory
                                                    ? toggleSubCategorySelection(item.id)
                                                    : setSelectedCategory(item)
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.categoryItemText,
                                                    selectedSubCategories.includes(item.id) && styles.categoryItemTextCheck,
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            )}
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    <Text style={styles.saveButtonText}>저장</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() =>
                                        selectedCategory ? setSelectedCategory(null) : setVisible(false)
                                    }
                                >
                                    <Text style={styles.closeButtonText}>
                                        {selectedCategory ? '뒤로 가기' : '닫기'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CategoryModal;

// Styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6DB777',
        marginVertical: 5,
        borderRadius: 10,
    },
    categoryItemCheck: {
        backgroundColor: '#6DB777',
    },
    categoryItemText: {
        color: '#6DB777',
    },
    categoryItemTextCheck: {
        color: '#fff',
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    saveButton: {
        marginHorizontal: 10,
        backgroundColor: '#6DB777',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
    },
    closeButton: {
        marginHorizontal: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#000',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
    },
});
