import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity>
          <View style={styles.navLeft}>

            
              <View style={styles.navLeftIcon}></View>
            

            <View style={styles.navLeftText}>
              <Text style={styles.navLeftTextTitle}>안녕하세요.</Text>
              <Text style={styles.navLeftTextSub}>트립콕님</Text>
            </View>
            

          </View>
        </TouchableOpacity>

        <View style={styles.navRight}>
          <TouchableOpacity style={styles.navRightNotification}></TouchableOpacity>
          <View style={styles.navRightMenu}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navContainer: {
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navLeftIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 99,
  },
  navLeftText: {
    display: 'flex',
    flexDirection: 'column',
  },
  navLeftTextTitle: {
    fontSize: 12,
    color: '#8F8C8C',
  },
  navLeftTextSub: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  navRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navRightNotification: {
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#DADADA',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {
      width: 0, // x 방향 그림자
      height: 4, // y 방향 그림자
    },
    shadowOpacity: 0.3, // 그림자 투명도 (0 ~ 1)
    shadowRadius: 4, // 그림자 퍼짐 정도
    
  },
});
