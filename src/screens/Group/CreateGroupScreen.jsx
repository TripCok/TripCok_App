import React, {useContext, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {
    Keyboard, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {UserContext} from "../../context/UserContext";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../api/api";

const CreateGroupScreen = ({navigation}) => {
    const {userData} = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/place/category/all");
                const leafCategories = extractLeafCategories(response.data); // 하위 카테고리 추출
                setCategories(leafCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // 페이지에 진입할 때 상태 초기화
            setTitle("");
            setContent("");
            setSelectedCategories([]);
        }, [])
    );

    const extractLeafCategories = (categories) => {
        const result = [];
        const traverse = (nodes) => {
            nodes.forEach((node) => {
                if (node.children.length === 0) {
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

    const handleSave = async () => {
        try {
            const response = await api.post("/group", {
                memberId: userData.id,
                groupName: title,
                description: content,
                categories: selectedCategories,
            });

            if (response.status === 201) {
                console.log("성공적으로 모임을 생성 성공");
                navigation.navigate("GroupStack", {screen: "GroupDetails", params: {item: response.data}}); // 상세 페이지로 이동
            }
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.contentContainer}>
                <View style={styles.backBox}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{position: "absolute", left: 0}}>
                        <Icon name="arrow-back-outline" size={34} color="#6DB777"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 26, color: "#6DB777", fontWeight: "600"}}>모임 만들기</Text>
                </View>

                <View>
                    <Text style={styles.inputTitle}>모임 이름</Text>
                    <TextInput
                        placeholderTextColor="#DADADA"
                        placeholder="모임 이름"
                        style={styles.textInput}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={{overflow: "hidden"}}>
                    <Text style={styles.inputTitle}>모임 설명</Text>
                    <TextInput
                        placeholderTextColor="#DADADA"
                        placeholder="모임 설명"
                        style={styles.groupDescInput}
                        multiline={true}
                        textAlignVertical="top"
                        value={content}
                        onChangeText={setContent}
                        keyboardType={"default"}
                    />
                </View>

                <View style={{height: '100%', display: 'flex', flex: 1}}>
                    <Text style={styles.inputTitle}>모임의 관심사를 선택해주세요!</Text>
                    <ScrollView style={{height: '100%', marginBottom: 75}}>
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
                </View>

                <View style={styles.saveButtonBox}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            (!title || !content) && {backgroundColor: "#ccc"},
                        ]}
                        disabled={!title || !content}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>저장</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        width: '100%',
        marginTop: 50,
        paddingHorizontal: 20,
        position: 'relative',
        flex: 1,
    },
    backBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    inputTitle: {
        fontSize: 22,
        fontWeight: 500,
        marginTop: 20,
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#6DB777',
        width: '100%',
    },
    groupDescInput: {
        overflow: 'hidden',
        width: '100%',
        height: 200,
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6DB777',
        textAlignVertical: 'top',
    },
    saveButtonBox: {
        marginLeft: 20,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: '3%',
    },
    saveButton: {
        width: '80%',
        height: 45,
        backgroundColor: '#6DB777',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    groupCategories: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        overflow: 'hidden',
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

});

export default CreateGroupScreen;
