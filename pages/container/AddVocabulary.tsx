import React from 'react';
import AddForm from '../../Content/AddForm';

const AddVocabulary = () => {
    return (
        <div className="flex items-center justify-center flex-col my-4  ">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-2xl my-2 font-bold ">Add New Vocabulary</h1>
                <p className="opacity-50 my-2">
                    Enter new vocabulary you want to save
                </p>
            </div>

            <AddForm />
        </div>
    );
};

export default AddVocabulary;