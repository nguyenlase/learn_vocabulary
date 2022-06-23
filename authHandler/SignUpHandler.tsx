import Link from 'next/link';
import React from 'react';
import FormLayout from '../reusable/FormReusable/FormLayout';

const SignUpHandler = () => {
    return (
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <div className="w-1/2 ">
                <div className="">
                    <h1 className="text-4xl my-4 font-bold tracking-wide">
                        Welcome back
                    </h1>
                    <p className="text-gray-400 text-md">
                        Welcome back! Please enter your details
                    </p>
                </div>

                <FormLayout authType="SignUp" />

                <div className="w-full flex items-center justify-center">
                    <p className="opacity-50 mr-4">
                        Are you already have an account ?
                    </p>
                    <Link href={'/auth/Login'}>
                        <a className="font-bold text-blue-600 hover:underline">
                            Login
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpHandler;