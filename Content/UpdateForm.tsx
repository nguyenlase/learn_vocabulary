import React, { useState } from 'react';
import { VocabAPI } from '../apiCall/VocabAPI';
import { UpdateAndDeleteProps } from '../models/others';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { refresh } from '../redux/slice/UserSlice';
import InputForm from '../reusable/FormReusable/InputForm';

const UpdateForm: React.FC<UpdateAndDeleteProps> = ({
    vocabID,
    vietnameseWord,
    englishWord,
    fnModal,
}) => {
    const [en, setEn] = useState<string>(englishWord);
    const [vn, setVn] = useState<string>(vietnameseWord);
    const loadingPage = useAppSelector((state) => state.userState.isRefresh);
    const dispatch = useAppDispatch();

    const handleUpdate = async () => {
        try {
            const vocabularyID = vocabID;
            const englishWord = en;
            const vietnameseWord = vn;

            const result = await VocabAPI.updateWord({
                englishWord,
                vietnameseWord,
                vocabularyID,
            });

            if (result.data) {
                dispatch(refresh(!loadingPage));
                fnModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center flex-col gap-4 ">
                <h1 className="text-xl font-bold my-2 tracking-wide">
                    Update word
                </h1>

                <InputForm
                    functionHandler={(e) => setEn(e)}
                    id="en"
                    nameLabel="English word"
                    placeholder={englishWord}
                    registerName="en"
                    type="text"
                    value={en}
                />

                <InputForm
                    functionHandler={(e) => setVn(e)}
                    id="vn"
                    nameLabel="Vietnamese word"
                    placeholder={vietnameseWord}
                    registerName="vn"
                    type="text"
                    value={vn}
                />

                <button
                    className="bg-black text-white rounded-md cursor-pointer transition-all hover:bg-blue-500 px-4 py-2"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateForm;