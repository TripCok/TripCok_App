import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import api from "../../api/api";
import Icon from "react-native-vector-icons/Ionicons";
import {UserContext} from "../../context/UserContext";

const CommentListScreen = ({navigation, route}) => {
        const [comments, setComment] = useState([]);
        const [loading, setLoading] = useState(true);
        const {userData} = useContext(UserContext);

        console.log(comments)

        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/postComments`, {
                    params: {
                        postId: route.params.post,
                        size: 10,
                        sort: 'id',
                        page: 0,
                    }
                });

                if (response.status === 200 && Array.isArray(response.data.content)) {
                    setComment(response.data.content);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setComment([]);
                }
            } catch (error) {
                console.error("Failed to fetch comments:", error);
                setComment([]);
            } finally {
                setLoading(false);
            }
        };

        const getFullImageUrl = (filePath) => {
            const baseURL = api.defaults?.baseURL || "http://localhost:8080";
            return `${baseURL}/file?filePath=${encodeURIComponent(filePath)}`;
        };

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

        const deletePostComment = async (itemId) => {
            console.log(itemId);
            const data = {
                "postCommentId": itemId,
                "memberId": userData.id,
            }
            try {
                const response = await api.delete('/postComment', {
                    data,
                    headers: {'Content-Type': 'application/json',}
                })

                if (response.status === 200) {
                    fetchComments();
                }
            } catch (error) {
                console.error("Failed to delete post comment:", error);
            }

        }

        useEffect(() => {
            fetchComments();
        }, []);

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute'}}>
                        <Icon name="chevron-back" size={28}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                        <Text style={{fontSize: 24, fontWeight: 500}}>댓글</Text>
                    </View>
                </View>

                {loading ? (
                    <Text>로딩 중...</Text>
                ) : comments.length === 0 ? (
                    <View>
                        <Text style={{color: "#888"}}>작성된 댓글이 없습니다.</Text>
                    </View>
                ) : (
                    comments.map((comment, index) => (
                        <View key={index} style={styles.commentBox}>
                            <View style={{flexDirection: "row", gap: 5, alignItems: "center", marginBottom: 10}}>
                                < Image style={styles.profileImage}
                                        source={
                                            comment.writerProfile?.profileImage
                                                ? {uri: getFullImageUrl(post.writerProfile.profileImage)}
                                                : require("../../assets/images/b-p-1.png")
                                        }
                                />
                                <Text style={{fontSize: 15, fontWeigh: 500}}>{comment.writerName}</Text>
                                <Text style={{fontSize: 15, fontWeigh: 500}}>({comment.writerEmail})</Text>
                            </View>

                            <Text style={{marginBottom: 10}}>{comment.content}</Text>

                            <View style={styles.bottomNav}>
                                < Text style={{color: '#888'}}>{formatDate(comment.createTime)}</Text>
                                <View style={{flexDirection: "row", gap: 10}}>
                                    {/*<TouchableOpacity style={styles.bottomNavBtn}>*/}
                                    {/*    <Text style={{color: 'white'}}>수정</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                    <TouchableOpacity style={styles.bottomNavBtn}
                                                      onPress={() => deletePostComment(comment.id)}>
                                        <Text style={{color: 'white'}}>삭제</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </View>
        )
            ;
    }
;

export default CommentListScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 66,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        position: "relative",
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        marginBottom: 20
    },
    profileImage: {
        width: 20,
        height: 20,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: "#6DB777",
    },
    commentBox: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#d2d2d2'
    },
    bottomNav: {
        display: 'flex',
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomNavBtn: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "#6DB777",
        borderRadius: 5,


    }
})