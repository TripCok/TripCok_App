import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import api from "../../../api/api";

const BoardContent = ({navigation, item}) => {
    const [posts, setPosts] = useState([]);
    const fetchBoardContent = async () => {
        try {
            const response = await api.get('/posts', {
                params: {
                    groupId: item.id,
                    page: 0,
                    size: 10,
                    sort: 'id'
                },
            });

            if (response.status === 200) {
                setPosts(response.data.content);
            }
        } catch (error) {

        }
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };

    useEffect(() => {
        fetchBoardContent();
    }, [])
    return <View style={styles.boardContent}>

        {posts && posts.length > 0 ? (
            <View>
                {posts.map(post => (
                    <TouchableOpacity key={post.id} style={styles.boardBox}
                                      onPress={() => navigation.navigate("PostDetail", {
                                          postId: post.id,
                                          navigation: navigation
                                      })}>
                        <Text style={{fontSize: 18}}>{post.type === "NOTICE" ?
                            <Text style={{fontWeight: 500, color: '#6DB777'}}>[ 공지 ] </Text> : <></>}{post.title}</Text>
                        <Text style={styles.postContent} numberOfLines={1} ellipsizeMode="tail">{post.content}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>작성자 : {post.writer}</Text>
                            <Text style={{color: '#888'}}>{formatDate(post.createTime)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        ) : (
            <View>
                <Text style={{color: '#888'}}>작성된 게시물이 없습니다.</Text>
            </View>
        )}


    </View>
};


export default BoardContent;

const styles = StyleSheet.create({
    boardContent: {
        marginTop: 20
    },
    boardBox: {
        width: '100%',
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingVertical: 10
    },
    postContent: {
        width: '100%',
        overflow: 'hidden',
        textAlign: 'left',
    }
})