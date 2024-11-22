import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';
import onboardingRegisterReducer from "./OnboardingRegisterSlice";

const store = configureStore({
    reducer: {
        onboarding: onboardingReducer,
        onboardingRegister: onboardingRegisterReducer,
    },
});

export default store;
