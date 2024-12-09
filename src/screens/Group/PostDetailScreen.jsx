import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import api from "../../api/api";
import {UserContext} from "../../context/UserContext";

const PostDetailScreen = ({navigation, route}) => {
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const {userData} = useContext(UserContext);


    const fetchPost = async () => {
        try {
            const response = await api.get(`/post/${route.params.post}`);

            if (response.status === 200) {
                const data = response.data;

                // 날짜 유효성 확인
                if (!data.createTime || isNaN(new Date(data.createTime).getTime())) {
                    console.warn("유효하지 않은 날짜:", data.createTime);
                    data.createTime = null;
                }

                setPost(data);
            } else {
                console.error("API 응답 상태 코드:", response.status);
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
        }
    };

    const onSubmitComment = async () => {
        if (!comment) {
            alert('댓글을 입력하세요.')
            return;
        }
        const data = {
            "content": comment,
            "postId": route.params.post,
            "memberId": userData.id,
            "groupId": post.groupId
        }

        console.log(data);
        const response = await api.post(`/postComment`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            setComment('')
            alert("성공적으로 댓글을 입력하였습니다.");
        }
    }

    const formatDate = (isoString) => {
        if (!isoString) return "날짜 없음";
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).format(date);
        } catch (error) {
            console.error("Invalid date format:", isoString);
            return "유효하지 않은 날짜";
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute'}}>
                        <Icon name="chevron-back" size={28}/>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                        <Text style={{fontSize: 24, fontWeight: 500}}>{post?.title || "게시물 제목 없음"}</Text>
                    </View>

                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 20}}>
                    <Text style={{fontSize: 15, fontWeight: 400}}>작성자 : </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        < Image style={styles.profileImage}
                                source={
                                    post.writerProfile?.profileImage
                                        ? {uri: post.writerProfile.profileImage}
                                        : require("../../assets/images/b-p-1.png")
                                }
                        />
                        <Text style={{fontSize: 15, fontWeight: 400}}>{post.writer}</Text>
                    </View>

                </View>

                <Text style={styles.createTime}>{formatDate(post.createTime)}</Text>

                <View style={styles.postContent}>
                    <Text>{post.content}</Text>
                </View>


            </ScrollView>
            <View style={styles.postCommentContainer}>
                <TouchableOpacity style={styles.commentIconBox}
                                  onPress={() => navigation.navigate("GroupStack", {
                                      screen: "CommentList",
                                      params: {post: post.id}
                                  })}
                >
                    <Icon name="chatbox-ellipses" size={20} color="white"></Icon>
                </TouchableOpacity>
                <View style={styles.postCommentInputBox}>
                    <TextInput style={styles.postCommentInput}
                               placeholder={'댓글을 입력하세요.'}
                               value={comment}
                               onChangeText={setComment}
                    ></TextInput>
                    <TouchableOpacity style={styles.postCommentInputSubmit} onPress={onSubmitComment}>
                        <Icon name='paper-plane' size={18} color='#6DB777'></Icon>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    )
        ;
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 66,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        position: "relative",
        height: "100%",
    },
    headerContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    navLeftIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileImage: {
        borderRadius: 99,
        borderWidth: 2,
        borderColor: '#6DB777',
        width: 25,
        height: 25,
        objectFit: 'cover'
    },

    createTime: {
        marginTop: 10,
        color: '#888',
    },
    postContent: {
        marginTop: 10,
        minHeight: 500,
    },
    postCommentContainer: {
        position: 'absolute',
        width: '100%',
        height: 70,
        bottom: 0,
        flexDirection: "row",
        justifyContent: 'center',
        gap: 10,

    },
    postCommentInputBox: {
        width: '75%',
        height: 40,
        position: "relative"
    },
    postCommentInput: {
        width: '100%',
        height: '100%',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#6DB777',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    commentIconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#6DB777',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }, postCommentInputSubmit: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        paddingHorizontal: 20,
        right: 0
    }


});
