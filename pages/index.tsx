import Footer from '../components/Footer';
import Header from '../components/Header';
import IntroduceContent from '../Content/IntroduceContent';
import OurContent from '../Content/OurContent';

const Home = () => {
    return (
        <div className="">
            <header>
                <Header />
            </header>
            <main>
                <IntroduceContent />

                <OurContent />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Home;


