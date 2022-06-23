import React from 'react';
import ReactPaginate from 'react-paginate';
import { UserAPI } from '../apiCall/UserAPI';
import { PaginateProps } from '../models/others';

const Pagination: React.FC<PaginateProps> = ({ length, pageFunction }) => {
    return (
        <div className="flex items-center justify-center ">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={pageFunction}
                pageRangeDisplayed={5}
                pageCount={length}
                previousLabel="<"
                className="flex items-center justify-center px-3 py-4 rounded-md   text-lg gap-6  mt-4   text-gray-500 shadow-md "
                activeClassName="py-2 px-4 rounded-md bg-blue-600 text-white font-bold"
                nextClassName="font-bold text-lg"
                previousClassName="font-bold text-lg"
            />
        </div>
    );
};

export default Pagination;