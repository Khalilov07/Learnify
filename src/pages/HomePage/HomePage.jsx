
import Course from './Sections/Course';
import Greeting from './Sections/Greeting';
import Reviews from './Sections/Reviews';

const HomePage = () => {
    

    return (
        <main className='main'>
           <Greeting />
           <Course />
           <Reviews />
        </main>
    );
};

export default HomePage;