import React, {forwardRef, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import {Modalize} from "react-native-modalize";
import api from "../../api/api";


const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const PreferCategoryModal = forwardRef((props, ref) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const fetchCategories = async () => {

        try {
            const response = await api.get("/place/category/all");

            if (response.status === 200) {
                setCategories(extractLeafCategories(response.data))
            }

        } catch (error) {
            console.log(error);
        }
    };

    const savePreferCategory = async () => {
        try {
            const response = await api.put("/member/prefer/category", selectedCategories);
            if (response.status === 200) {
                ref.current?.close();
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error("Error saving categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const extractLeafCategories = (categories) => {
        const result = [];
        const traverse = (nodes) => {
            nodes.forEach((node) => {
                if (!node.children || node.children.length === 0) {
                    result.push(node);
                } else {
                    traverse(node.children);
                }
            });
        };
        traverse(categories);
        return result;
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId) // 선택 해제
                : [...prevSelected, categoryId] // 선택 추가
        );
    };

    const updatePreferCategorySkip = async () => {
        console.log("updatePreferCategorySkip");

        const response = await api.put("/member/prefer/category/skip");

        console.log(response.status);

        if (response.status === 200) {
            ref.current?.close();
        }
        if (response.status === 400) {
            alert(`네트워크 에러입니다.`);

        }

    }

    return (
        <Modalize ref={ref} modalHeight={SCREEN_HEIGHT * 0.85}>
            <View style={styles.modalContent}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={{fontSize: 18,}}>회원님에게 더 좋은 여행지 제공을 위해</Text>
                        <Text style={{fontSize: 18,}}>선호 하는 관심사를 선택해주세요! 🎉</Text>
                    </View>
                    <TouchableOpacity onPress={updatePreferCategorySkip}>
                        <Text style={{fontSize: 16, color: '#d2d2d2'}}>Skip</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.groupCategories}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.groupCategoryBox,
                                    selectedCategories.includes(category.id) && styles.groupCategoryBoxCheck,
                                ]}
                                onPress={() => toggleCategory(category.id)}
                            >
                                <Text
                                    style={[
                                        styles.groupCategoryText,
                                        selectedCategories.includes(category.id) && {color: "white"},
                                    ]}
                                >
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.modalClose} onPress={savePreferCategory}>
                    <Text style={styles.modalCloseText}>저장</Text>
                </TouchableOpacity>

            </View>
        </Modalize>
    );
});

export default PreferCategoryModal;

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        display: "flex",
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        overflow: 'hidden',
    },
    scrollView: {
        height: SCREEN_HEIGHT * 0.64,
        width: '100%',
        marginBottom: 10
    },
    groupCategories: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        overflow: 'hidden',
    },
    modalClose: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: '#6DB777',

    },
    modalCloseText: {
        fontSize: 16,
        fontWeight: 600,
        color: "#fff",
    },
    groupCategoryBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6DB777',
    },
    groupCategoryBoxCheck: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: "#6DB777",
        borderColor: '#6DB777',
    },
})