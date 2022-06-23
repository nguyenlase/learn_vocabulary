import React from 'react';
import { VocabProps } from '../../models/others';

import UpdateAndDelete from '../../components/UpdateAndDelete';

const VocabCard: React.FC<VocabProps> = ({
    Vietnamese,
    EnglishWord,
    UserID,
    VocabularyID,
}) => {
    return (
        <div className="flex items-center justify-center gap-4">
            <div className="flex  text-lg bg-[#9DD6DF] p-6 text-black my-2 rounded-md w-full ">
                <div className="tracking-wide w-1/2   text-left border-r-4 border-black mr-2">
                    {EnglishWord}
                </div>

                <div className="tracking-wide w-1/2  text-center ">
                    {Vietnamese}
                </div>
            </div>
            <UpdateAndDelete
                vietnameseWord={Vietnamese}
                englishWord={EnglishWord}
                vocabID={VocabularyID}
                fnModal={() => {}}
            />
        </div>
    );
};

export default VocabCard;