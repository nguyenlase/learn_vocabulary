import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInforLogin: {
        UserEmail: '',
        Address: '',
        UserName: '',
    },
    token: '',
    toggleModal: false,
    isRefresh: false,
};

const UserSlice = createSlice({
    name: '/user/toolkit',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userInforLogin = action.payload;
        },
        getToken: (state, action) => {
            state.token = action.payload;
        },
        toggleModal: (state, action) => {
            state.toggleModal = action.payload;
        },
        refresh: (state, action) => {
            state.isRefresh = action.payload;
        },
    },
});

export const { loginUser, getToken, toggleModal, refresh } = UserSlice.actions;
export default UserSlice.reducer;
