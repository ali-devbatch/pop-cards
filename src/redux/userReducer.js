import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        access: JSON.parse(localStorage.getItem('popcard_user'))?.access,
        refresh: JSON.parse(localStorage.getItem('popcard_user'))?.refresh,
        userData: null,
        navbarSelected: 'dashboard',
        navbarOpened: false,
    },
    reducers: {
        login: (state, action) => {
            state.access = action.payload.tokens.access;
            state.refresh = action.payload.tokens.refresh;
            state.userData = action.payload.user;
        },
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            state.userData = null;
        },
        setTokens: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },

        setNavbarSelected: (state, action) => {
            state.navbarSelected = action.payload;
        },
        setNavbarOpened: (state, action) => {
            state.navbarOpened = action.payload;
        },
    }
});

export const {
    login,
    logout,
    setTokens,
    setNavbarSelected,
    setNavbarOpened,
} = user.actions;

export default user.reducer;

export const selectAccessToken = (state) => state.user.access;
export const selectRefreshToken = (state) => state.user.refresh;
export const userDataSelector = (state) => state.user.userData;
export const navbarSelectedSelector = (state) => state.user.navbarSelected;
export const navbarOpenedSelector = (state) => state.user.navbarOpened;
