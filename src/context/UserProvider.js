import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [hasOnboarded, setHasOnboarded] = useState(false);
    const [loading, setLoading] = useState(true); // 데이터 로드 상태 추가

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("userData");
                if (storedData === null) {
                    setUserData(JSON.parse(storedData));
                    setHasOnboarded(true);
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            } finally {
                setLoading(false); // 데이터 로드 완료
            }
        };

        loadUserData();
    }, []);

    const saveUserData = async (data) => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(data));
            setUserData(data);
            setHasOnboarded(true); // 데이터 저장 시 온보딩 완료로 설정
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    };

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem("userData");
            setUserData(null);
            setHasOnboarded(false);
        } catch (error) {
            console.error("Failed to clear user data:", error);
        }
    };

    if (loading) {
        // 로딩 상태 처리
        return null; // 또는 로딩 스피너를 추가할 수 있음
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

export default UserProvider;
