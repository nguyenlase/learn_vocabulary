import Image from 'next/image';
import React from 'react';
import LoginHandler from '../../authHandler/LoginHandler';
import loginImage from '../../public/10.avif';

const Login = () => {
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

            <LoginHandler />
        </div>
    );
};

export default Login;