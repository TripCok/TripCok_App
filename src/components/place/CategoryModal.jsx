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
            // 최상위 카테고리만 로드 (depth: 0)
            setCategories(data.filter((category) => category.depth === 0));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSubCategorySelection = (categoryId) => {
        setSelectedSubCategories((prev) => {
            if (prev.includes(categoryId)) {
                // 이미 선택된 경우 제거
                return prev.filter((id) => id !== categoryId);
            } else {
                // 선택되지 않은 경우 추가
                return [...prev, categoryId];
            }
        });
    };

    const handleSave = () => {
        const selectedItems = findSelectedCategories(categories, selectedSubCategories);

        if (selectedItems.length > 0) {
            onSave(selectedItems); // 부모 컴포넌트로 선택된 모든 카테고리 전달
        } else {
            console.warn('No categories selected!');
        }

        setSelectedCategory(null); // 선택된 카테고리 초기화
        setVisible(false); // 모달 닫기
    };

    // 모든 카테고리를 재귀적으로 탐색하여 선택된 항목 찾기
    const findSelectedCategories = (allCategories, selectedIds) => {
        let results = [];

        allCategories.forEach((category) => {
            // 현재 카테고리가 선택된 상태면 추가
            if (selectedIds.includes(category.id)) {
                results.push(category);
            }
            // 하위 카테고리가 있는 경우 재귀적으로 탐색
            if (category.children && category.children.length > 0) {
                const childResults = findSelectedCategories(category.children, selectedIds);
                results = [...results, ...childResults];
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
                            <Text style={styles.selectedCountText}>
                                선택된 항목: {selectedSubCategories.length}개
                            </Text>
                            {loading ? (
                                <ActivityIndicator size="large" color="#6DB777"/>
                            ) : (
                                <FlatList
                                    data={selectedCategory ? selectedCategory.children : categories}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.categoryItem,
                                                selectedSubCategories.includes(item.id) && styles.categoryItemCheck,
                                            ]}
                                            onPress={() =>
                                                item.children && item.children.length > 0
                                                    ? setSelectedCategory(item) // 하위 카테고리가 있으면 해당 카테고리로 이동
                                                    : toggleSubCategorySelection(item.id) // 하위 카테고리가 없으면 선택/해제
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.categoryItemText,
                                                    selectedSubCategories.includes(item.id) && styles.categoryItemTextCheck,
                                                ]}
                                            >
                                                {/*{item.name} {item.depth !== undefined ? `(Level ${item.depth})` : ''}*/}
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
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedCountText: {
        fontSize: 14,
        color: '#6DB777',
        marginBottom: 10,
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
});
