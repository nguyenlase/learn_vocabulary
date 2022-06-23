import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
const OurContent: NextPage = () => {
    return (
        <div className="flex items-center justify-center gap-9 ">
            <Image
                src="/11.avif"
                width={700}
                height={700}
                alt="garen-image"
                objectFit="contain"
            />

            <div className="flex items-start justify-center flex-col tracking-wider w-[40%] ">
                <h1 className="text-4xl my-4 font-bold ">
                    Great Digital Agency
                </h1>

                <h4 className="my-2 font-semibold text-gray-500">
                    Creative & Professional Digital Agency
                </h4>

                <p className="my-2 opacity-50">
                    I have many topics that I need to improve, but one that
                    would be very helpful is talking about myself when I need to
                    do informal or short introductions, for example with
                    colleagues and new clients.Today I want to help her and you
                    get clarity and confidence when introducing yourself in
                    English.
                </p>
            </div>
        </div>
    );
};

export default OurContent;