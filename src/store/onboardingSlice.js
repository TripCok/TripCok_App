import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        hasOnboarded: false,
    },
    reducers: {
        setOnboarded: (state, action) => {
            state.hasOnboarded = action.payload;
        },
    },
});

export const { setOnboarded } = onboardingSlice.actions;
export default onboardingSlice.reducer;
