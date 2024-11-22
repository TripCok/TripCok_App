import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    birthdate: '',
    gender: '',
    address: ''
};

const OnboardingRegisterSlice = createSlice({
    name: 'onboardingRegister',
    initialState,
    reducers: {
        updateField(state, action) {
            const {field, value} = action.payload;
            state[field] = value; // 필드 값 업데이트
        },
        resetOnboarding(state) {
            Object.assign(state, initialState); // 온보딩 데이터 초기화
        },
    },
});

export const {
    updateField,
    resetOnboarding
} = OnboardingRegisterSlice.actions;
export default OnboardingRegisterSlice.reducer;
