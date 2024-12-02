import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {UserContext} from "../../context/UserContext";
import api from "../../api/api";
import Icon from "react-native-vector-icons/Ionicons";

const CreatePost = ({navigation, route}) => {
    const {userData} = useContext(UserContext);
    const groupId = route.params.groupId;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState('COMMON');

    const createPost = async () => {
        const data = {
            title: title,
            content: content,
            type: type
        };

        if (!title || !content) {
            alert("비어있는 값이 없는지 확인해주세요.");
            return;
        }

        try {
            const response = await api.post(
                `/group/post?memberId=${userData.id}&groupId=${groupId}`,
                data, // 본문 데이터
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                alert("게시물을 생성하였습니다.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.createPostHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                        <Icon name="chevron-back" size={28}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>게시물 작성</Text>
                </View>

                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 500, color: "#6DB777"}}>제목</Text>
                <TextInput
                    style={styles.postTitleInput}
                    placeholderTextColor="#DADADA"
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                ></TextInput>

                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 500, color: "#6DB777"}}>내용</Text>
                <TextInput
                    placeholderTextColor="#DADADA"
                    placeholder="모임 설명"
                    style={styles.postContentInput}
                    multiline={true}
                    textAlignVertical="top"
                    value={content}
                    onChangeText={setContent}
                    keyboardType={"default"}
                />

            </View>
            <View style={{
                width: '100%',
                position: 'absolute',
                flexDirection: 'row',
                bottom: 40,
                justifyContent: 'center',
                marginHorizontal: 20
            }}>
                <TouchableOpacity style={{
                    width: "75%",
                    backgroundColor: "#6DB777",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                }} onPress={createPost}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 500}}>작성</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 66,
        paddingHorizontal: 20,
        position: "relative",
    },
    createPostHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postTitleInput: {
        marginTop: 10,
        fontSize: 15,
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: '#6DB777',
    },
    postContentInput: {
        marginTop: 10,
        fontSize: 15,
        height: 300,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: '#6DB777',
        textAlign: 'left',
    }

})