import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OnboardingLogin = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>로그인을 진행해주세요.</Text>

      <TextInput style={styles.input} placeholder="이메일" />
      <TextInput style={styles.input} placeholder="비밀번호" />

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.goBack()}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

    </View>
  );
};

export default OnboardingLogin;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    padding: 30,
  },
  backButton: {
    marginTop: 40,
    marginBottom:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#dadada',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6DB777',
    borderRadius: 10,
    height: 50,
    left:"30",
    position: 'absolute',
    bottom: "40",
  },  
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
  },
});
