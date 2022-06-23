import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import { useAppSelector } from '../redux/hook';
import Navbar from './Navbar';
import user from '../public/user.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { VocabAPI } from '../apiCall/VocabAPI';
import { SearchProps } from '../models/others';

const Header = () => {
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [listSearch, setListSearch] = useState<SearchProps[]>([]);

    const router = useRouter();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');

        if (userEmail !== null) {
            setEmail(userEmail);
        }
    }, []);

    const handleSearch = debounce(
        async (e: React.KeyboardEvent<HTMLInputElement>) => {
            const keySearch = (e.target as HTMLInputElement).value;

            if (e.key == 'Enter') {
                // Code here
                console.log('enter: ' + keySearch);
            }

            if (keySearch === '') {
                setListSearch([]);
            } else {
                const result = await VocabAPI.searchWord(keySearch);
                console.log(result.data);
                if (result.data) {
                    setListSearch(result.data);
                }
            }
        },
        1000
    );

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        router.push('/auth/Login');
    };

    return (
        <div className="h-[5rem] backdrop-blur-lg flex items-center justify-between px-20 shadow-md fixed top-0 left-0 right-0   z-50">
            <Link href="/" passHref>
                <h1 className="font-bold text-2xl cursor-pointer hover:scale-105 transition-all">
                    Beatrice
                </h1>
            </Link>

            <Navbar />

            <div className="flex items-center justify-center text-xl  gap-6">
                <div className="flex items-center justify-center">
                    <BiSearch
                        className="header-icon"
                        onClick={() => setShowSearchInput(!showSearchInput)}
                    />

                    {showSearchInput && (
                        <div className="relative flex items-start justify-center flex-col ">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search"
                                onKeyUp={handleSearch}
                                className=" outline-none mx-2 border-b-2 border-black text-sm transition-all"
                            />
                            <div className="flex items-center justify-center flex-col gap-1 absolute border shadow-md  top-[30px] left-0 ">
                                {listSearch.map((word, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center border-b-2 font-semibold  justify-center gap-4 text-sm w-[250px]"
                                        >
                                            <p className="w-1/2 border-r-2 ">
                                                {word.EnglishWord}
                                            </p>
                                            <p className="w-1/2">
                                                {word.Vietnamese}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {email ? (
                    <div className="flex items-center justify-center text-sm">
                        <span className="tracking-wide mr-2 cursor-pointer transition-all hover:text-blue-400">
                            {email}
                        </span>
                        <Image src={user} width={50} height={50} alt="images" />

                        <button
                            className="p-2 bg-black text-white rounded-md cursor-pointer"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <Link href="/auth/Login" passHref>
                        <BiUserCircle className="header-icon" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;