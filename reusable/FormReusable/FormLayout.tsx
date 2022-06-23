import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { IHandleAuth, LoginUserProps } from '../../models/others';
import InputForm from './InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserAPI } from '../../apiCall/UserAPI';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hook';
import { getToken, loginUser } from '../../redux/slice/UserSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '../../firebase';

const schema = yup.object().shape({
    userEmail: yup
        .string()
        .required()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Your email invalid '),
    password: yup
        .string()
        .required()
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            'Your password invalid'
        ),
});

const auth = getAuth();

const FormLayout: React.FC<IHandleAuth> = ({ authType }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginUserProps>({
        // resolver: yupResolver(schema),
    });
    const [userEmail, setUserEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onSubmit = async (e: LoginUserProps) => {
        authType === 'SignUp'
            ? submitWithSignUp(e.remember)
            : submitWithLogin(e.remember);
    };

    const submitWithLogin = async (e: boolean) => {
        const params = {
            userEmail,
            password,
            remember: e,
        };

        const result = await UserAPI.loginUser(params);
        if (result.status === 200) {
            const userLogin = {
                UserEmail: result.data[0].UserEmail,
                Address: result.data[0].Address,
                UserName: result.data[0].UserName,
            };
            dispatch(loginUser(userLogin));
            toast.success('User Login is success');
            localStorage.setItem('userEmail', userLogin.UserEmail);

            setTimeout(() => {
                router.push(`/vocabulary/${userEmail}?page=${1}`);
            }, 1000);
        } else {
            toast.error('Login account failed');
        }

        setValue('userEmail', '');
        setValue('password', '');
    };

    const submitWithSignUp = async (e: boolean) => {
        try {
            const paramSignUp = {
                userEmail,
                password,
                userName,
                confirmPassword,
                remember: e,
            };

            const result = await UserAPI.signUpUser(paramSignUp);
            if (result.status === 200) {
                const paramsDispatch = {
                    UserEmail: userEmail,
                    Address: '319 Tran Phu',
                    UserName: userName,
                };

                dispatch(loginUser(paramsDispatch));
                dispatch(getToken(result.data.token));

                localStorage.setItem('userEmail', paramsDispatch.UserEmail);
                console.log('Sign up function');
                router.push(`/`);
            } else {
                toast.error('Sign up account failed');
            }

            // router.push(`/`);
        } catch (error) {
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
            .then((result) => {
                const userLogin = result.user;
                const params = {
                    UserEmail: userLogin.email,
                    UserName: userLogin.displayName,
                    Address: '319 Tran Phu',
                };
                dispatch(loginUser(params));

                if (params.UserEmail !== null) {
                    localStorage.setItem('userEmail', params.UserEmail);
                    console.log('firebaseAuth');
                    router.push(`/`);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <form
                className="flex items-start justify-center w-full flex-col mt-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                {authType === 'SignUp' && (
                    <InputForm
                        type="UserName"
                        id="UserName"
                        placeholder="Enter your name"
                        registerName="UserName"
                        functionHandler={(e) => setUserName(e)}
                        nameLabel="UserName"
                    />
                )}

                <InputForm
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    registerName="Email"
                    functionHandler={(e) => setUserEmail(e)}
                    nameLabel="Email"
                />

                <InputForm
                    type="password"
                    id="password"
                    placeholder="***********"
                    registerName="Password"
                    functionHandler={(e) => setPassword(e)}
                    nameLabel="Password"
                />

                {authType === 'SignUp' && (
                    <InputForm
                        type="password"
                        id="ConfirmPassword"
                        placeholder="***********"
                        registerName="ConfirmPassword"
                        functionHandler={(e) => setConfirmPassword(e)}
                        nameLabel="Confirm Password"
                    />
                )}

                <div className="w-full flex items-center justify-between font-bold my-4 ">
                    <div className="flex items-center justify-center">
                        <input
                            type={'checkbox'}
                            id="checkBox"
                            className="mr-2"
                            {...register('remember')}
                        />
                        <span className="text-sm ">Remember for 30days </span>
                    </div>
                    <p className="text-sm cursor-pointer transition-all hover:text-blue-500">
                        Forgot password
                    </p>
                </div>
                <button className="w-full bg-black text-white py-2 transition-all hover:bg-blue-500 my-2 rounded-md ">
                    Sign {authType === 'SignUp' ? 'up' : 'in'}
                </button>
            </form>

            <div className="w-full flex flex-col ">
                <button
                    onClick={loginWithGoogle}
                    className="w-full  border flex items-center justify-center    text-black rounded-md py-2 mt-2"
                >
                    <FcGoogle />
                    <span className="mx-2 text-black font-semibold">
                        Sign {authType === 'SignUp' ? 'up' : 'in'} with google
                    </span>
                </button>
            </div>
        </div>
    );
};

export default FormLayout;