import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateGroupScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.backBox}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', left: 0}}>
                        <Icon name="arrow-back-outline" size={34} color="#6DB777"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 26, color: '#6DB777', fontWeight: '600'}}>모임 만들기</Text>
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

                <View style={{overflow: 'hidden'}}>
                    <Text style={styles.inputTitle}>모임 설명</Text>
                    <TextInput
                        placeholderTextColor="#DADADA"
                        placeholder="모임 설명"
                        style={styles.groupDescInput}
                        multiline={true} // 멀티라인 활성화
                        textAlignVertical="top" // 텍스트 입력을 상단 정렬
                        value={content} // 내용 상태와 연결
                        onChangeText={setContent} // 상태 업데이트
                    />
                </View>

                <View style={styles.saveButtonBox}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            (!title || !content) && {backgroundColor: '#ccc'},
                        ]}
                        disabled={!title || !content}
                    >
                        <Text style={styles.saveButtonText}>저장</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#6DB777',
        marginBottom: 20,
        width: '100%',
    },
    groupDescInput: {
        overflow: 'hidden',
        width: '100%',
        height: 120, // 높이 설정
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
});

export default CreateGroupScreen;
