import React, {useState, useEffect} from "react";
import {UserContext} from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, View, StyleSheet} from "react-native";

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태
    const [hasOnboarded, setHasOnboarded] = useState(false); // 온보딩 여부 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("userData");
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                    setHasOnboarded(true);
                } else {
                    setUserData(null);
                    setHasOnboarded(false);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        loadUserData();
    }, []);

    const saveUserData = async (data) => {
        try {
            if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
                throw new Error("Invalid user data: cannot save null or empty data.");
            }
            await AsyncStorage.setItem("userData", JSON.stringify(data));
            setUserData(data);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem("userData");
            setUserData(null);
            setHasOnboarded(false);
        } catch (error) {
            console.error("Error clearing user data:", error);
        }
    };

    if (loading) {
        // 로딩 상태 처리 (스피너 표시)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6DB777"/>
            </View>
        );
    }

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData: saveUserData,
                hasOnboarded,
                setHasOnboarded,
                clearUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});

export default UserProvider;
