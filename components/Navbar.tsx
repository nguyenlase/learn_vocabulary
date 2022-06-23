import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UserAPI } from '../apiCall/UserAPI';

const Navbar = () => {
    const router = useRouter();

    const handleGetVocabulary = async () => {
        const userEmail = localStorage.getItem('userEmail');
        const page = 1;

        if (userEmail !== null) {
            router.push(`/vocabulary/${userEmail}`);
        } else {
            router.push('/');
        }
    };

    return (
        <ul className="gap-10 flex items-center justify-center cursor-pointer opacity-50 ">
            <li>
                <motion.p className="text-black font-bold">Home</motion.p>
            </li>
            <li onClick={handleGetVocabulary}>
                <p>See all words</p>
            </li>
            <li>
                <p>Pricing</p>
            </li>
            <li>
                <p>Success</p>
            </li>
            <li>
                <p>About</p>
            </li>
        </ul>
    );
};

export default Navbar;