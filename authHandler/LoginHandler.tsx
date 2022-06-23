import Link from 'next/link';
import FormLayout from '../reusable/FormReusable/FormLayout';

const LoginHandler = () => {
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

                <FormLayout authType="Login" />

                <div className="w-full flex items-center justify-center">
                    <p className="opacity-50 mr-4">
                        Don't have an account yet ?
                    </p>
                    <Link href={'/auth/SignUp'}>
                        <a className="font-bold text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginHandler;