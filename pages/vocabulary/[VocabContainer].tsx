import React, { useEffect, useState } from 'react';
import { UserAPI } from '../../apiCall/UserAPI';
import Header from '../../components/Header';
import { test, VocabProps } from '../../models/others';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import VocabCard from './VocabCard';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import AddVocabulary from '../container/AddVocabulary';
import { toggleModal } from '../../redux/slice/UserSlice';
import Pagination from '../../components/Pagination';
import { VocabAPI } from '../../apiCall/VocabAPI';
import { useRouter } from 'next/router';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export async function getServerSideProps(context: any) {
    const email = context.params.VocabContainer;
    const length = await VocabAPI.getLength(email);

    return {
        props: { length: length.data.lengthPage },
    };
}

const VocabContainer: React.FC<test> = ({ length }) => {
    const [listVocab, setListVocab] = useState<VocabProps[]>([]);
    const [page, setPage] = useState<number>(1);

    const isRefresh = useAppSelector((state) => state.userState.isRefresh);
    const stateModal = useAppSelector((state) => state.userState.toggleModal);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const userEmail = localStorage.getItem('userEmail');

            if (userEmail !== null) {
                const result = await UserAPI.getVocabularyByUser({
                    userEmail,
                    page,
                });

                console.log(result.data);
                setListVocab(result.data);
            }
        };

        fetchData();
    }, [page, isRefresh]);

    const handlePageClick = async (event: { selected: number }) => {
        const page = event.selected + 1;
        const userEmail = localStorage.getItem('userEmail');

        if (userEmail) {
            setPage(page);
            router.push(`/vocabulary/${userEmail}?page = ${page}`);
        }
    };

    return (
        <div className="w-screen relative">
            <Header />
            {listVocab.length > 0 && (
                <div className="flex items-start px-6 justify-center flex-col mt-32 w-1/2 ">
                    {listVocab.map((word, index) => {
                        return (
                            <div key={index} className="w-full">
                                <VocabCard
                                    EnglishWord={word.EnglishWord}
                                    Vietnamese={word.Vietnamese}
                                    UserID={word.UserID}
                                    UserEmail=""
                                    VocabularyID={word.VocabularyID}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <div
                className="fixed right-4 bottom-4 rounded-full cursor-pointer bg-black text-white text-center p-4"
                onClick={() => dispatch(toggleModal(true))}
            >
                <AiOutlinePlus />
            </div>

            {stateModal && (
                <Modal
                    isOpen={stateModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <AddVocabulary />

                    <div
                        className="absolute top-2 right-2 cursor-pointer rounded-full p-1 bg-black text-white"
                        onClick={() => dispatch(toggleModal(false))}
                    >
                        <AiOutlineClose />
                    </div>
                </Modal>
            )}

            <Pagination length={length} pageFunction={handlePageClick} />
        </div>
    );
};

export default VocabContainer;