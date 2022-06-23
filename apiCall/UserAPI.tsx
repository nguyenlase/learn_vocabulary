import {
    getAllBYPage,
    UserLoginProps,
    UserSignUpProps,
} from '../models/others';
import axiosClient from './axiosClient';

export const UserAPI = {
    loginUser: (params: UserLoginProps) => {
        const url = '/api/user/LoginUser';
        return axiosClient.post(url, {
            userEmail: params.userEmail,
            password: params.password,
        });
    },
    signUpUser: (params: UserSignUpProps) => {
        const url = '/api/user/SignUpUser';
        return axiosClient.post(url, {
            userEmail: params.userEmail,
            password: params.password,
            userName: params.userName,
        });
    },
    getVocabularyByUser: (params: getAllBYPage) => {
        const url = `/api/vocabulary/GetAllVocabulary`;
        return axiosClient.post(url, null, {
            params: {
                userEmail: params.userEmail,
                page: params.page,
            },
        });
    },
};