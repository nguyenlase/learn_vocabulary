import { UpdateProps, VocabProps } from '../models/others';
import axiosClient from './axiosClient';
// import { VocabProps } from '../models/others';

export const VocabAPI = {
    addNew: (params: VocabProps) => {
        const url = '/api/vocabulary/AddNew';
        return axiosClient.post(url, null, {
            params: {
                vnWord: params.Vietnamese,
                enWord: params.EnglishWord,
                userEmail: params.UserEmail,
            },
        });
    },

    getLength: (userEmail: string) => {
        const url = '/api/vocabulary/GetLength';
        return axiosClient.post(url, null, {
            params: {
                userEmail,
            },
        });
    },

    deleteWord: (id: number) => {
        const url = '/api/vocabulary/Delete';
        return axiosClient.post(url, null, {
            params: {
                id,
            },
        });
    },

    updateWord: (params: UpdateProps) => {
        const url = '/api/vocabulary/Update';
        return axiosClient.post(url, null, {
            params: {
                id: params.vocabularyID,
                english: params.englishWord,
                vietnamese: params.vietnameseWord,
            },
        });
    },

    searchWord: (keySearch: string) => {
        const url = '/api/vocabulary/Search';
        return axiosClient.post(url, null, {
            params: {
                keySearch,
            },
        });
    },
};