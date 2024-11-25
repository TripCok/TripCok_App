import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';
import onboardingRegisterReducer from "./OnboardingRegisterSlice";
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        onboarding: onboardingReducer,
        onboardingRegister: onboardingRegisterReducer,
        user:userReducer
    },
});

export default store;
