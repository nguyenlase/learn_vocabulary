import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { VocabAPI } from '../apiCall/VocabAPI';
import { UpdateAndDeleteProps } from '../models/others';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { refresh } from '../redux/slice/UserSlice';
import Modal from 'react-modal';
import InputForm from '../reusable/FormReusable/InputForm';
import UpdateForm from '../Content/UpdateForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '12px',
    },
};

const UpdateAndDelete: React.FC<UpdateAndDeleteProps> = ({
    vocabID,
    englishWord,
    vietnameseWord,
}) => {
    const dispatch = useAppDispatch();
    const loadPage = useAppSelector((state) => state.userState.isRefresh);
    const [isModal, setIsModal] = useState<boolean>(false);

    const handleDelete = async () => {
        if (confirm('Do you want to delete this word ?') == true) {
            const result = await VocabAPI.deleteWord(vocabID);

            if (result.data) {
                dispatch(refresh(!loadPage));
            }
        }
    };

    return (
        <div className="flex items-center justify-start  gap-4">
            <div
                className="p-[14px] rounded-full my-2 bg-blue-400 cursor-pointer text-white "
                onClick={() => setIsModal(true)}
            >
                <GrUpdate />
            </div>
            <div
                className="p-[14px] rounded-full my-2 bg-red-400 cursor-pointer text-white "
                onClick={handleDelete}
            >
                <AiOutlineDelete />
            </div>

            {isModal && (
                <Modal
                    isOpen={isModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <UpdateForm
                        vocabID={vocabID}
                        englishWord={englishWord}
                        vietnameseWord={vietnameseWord}
                        fnModal={(e) => setIsModal(e)}
                    />

                    <div
                        className="absolute top-2 right-2 cursor-pointer rounded-full p-1 bg-black text-white"
                        onClick={() => setIsModal(false)}
                    >
                        <AiOutlineClose />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UpdateAndDelete;