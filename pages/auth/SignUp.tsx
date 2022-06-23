import Image from 'next/image';
import React from 'react';
import SignUpHandler from '../../authHandler/SignUpHandler';
import loginImage from '../../public/login.webp';

const SignUp = () => {
    return (
        <div className="h-screen  flex items-center justify-between">
            <div className="w-1/2 h-full mr-4 ">
                <Image
                    src={loginImage}
                    alt="images"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                />
            </div>

            <SignUpHandler />
        </div>
    );
};

export default SignUp;