import React, { createContext, useState } from "react";

export const OnboardingContext = createContext();

const OnboardingProvider = ({ children }) => {
    const [onboardingData, setOnboardingData] = useState({}); // 온보딩 데이터 초기화

    const updateOnboardingData = (field, value) => {
        setOnboardingData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const clearOnboardingData = () => {
        setOnboardingData({});
    };

    return (
        <OnboardingContext.Provider
            value={{
                onboardingData,
                updateOnboardingData,
                clearOnboardingData,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export default OnboardingProvider;
