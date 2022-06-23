import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UserAPI } from '../apiCall/UserAPI';
import { VocabAPI } from '../apiCall/VocabAPI';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { refresh, toggleModal } from '../redux/slice/UserSlice';
import InputForm from '../reusable/FormReusable/InputForm';

const AddForm = () => {
    const [vnWord, setVnWord] = useState<string>('');
    const [englishWord, setEnglishWord] = useState<string>('');
    const user = useAppSelector((state) => state.userState.userInforLogin);
    const isRefresh = useAppSelector((state) => state.userState.isRefresh);
    const dispatch = useAppDispatch();

    const handleAddNew = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const params = {
                EnglishWord: englishWord,
                Vietnamese: vnWord,
                UserID: 1,
                UserEmail: user.UserEmail,
                VocabularyID: 2,
            };
            const result = await VocabAPI.addNew(params);
            if (result) {
                dispatch(toggleModal(false));
                dispatch(refresh(!isRefresh));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form
            className="w-full flex items-center justify-center flex-col"
            onSubmit={handleAddNew}
        >
            <InputForm
                id="en"
                nameLabel="English word"
                type="text"
                functionHandler={(e) => setEnglishWord(e)}
                placeholder="Enter your english word"
                registerName="en"
            />

            <InputForm
                id="vn"
                nameLabel="Vietnamese word"
                type="text"
                functionHandler={(e) => setVnWord(e)}
                placeholder="Enter your vietnamese word"
                registerName="vn"
            />

            <button className="py-2 px-4 bg-black text-white rounded-md ">
                Add New
            </button>
        </form>
    );
};

export default AddForm;