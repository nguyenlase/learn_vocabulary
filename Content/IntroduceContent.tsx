
import Image from 'next/image';
import Button from '../components/Button';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const IntroduceContent = () => {
    const router = useRouter();
    const handleGetStarted = () => {
        try {
            router.push('/auth/Login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex items-center justify-between px-32 mt-20">
            <motion.div
                className="flex items-start justify-center ml-5 flex-col"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 0.5,
                    stiffness: 300,
                    type: 'spring',
                }}
            >
                <h1 className="my-4 text-6xl font-bold cursor-pointer ">
                    Discover the <br /> new world
                </h1>
                <h6 className="opacity-50 text-xl">
                    We are waiting to discover <br /> and enjoy you the best
                    places of the world
                </h6>

                <div className="flex items-center justify-start mt-6 mr-6 ">
                    <Button name="Get Started " event={handleGetStarted} />

                    <div className="flex items-center justify-center transition-all hover:text-blue-500">
                        <p className=" text-md tracking-wider font-bold  cursor-pointer ">
                            Learn more
                        </p>
                        <AiOutlineArrowRight className="ml-2 mt-1" />
                    </div>
                </div>
            </motion.div>

            <Image
                src="/12.avif"
                width={700}
                height={700}
                alt="images"
                objectFit="contain"
            />
        </div>
    );
};

export default IntroduceContent;