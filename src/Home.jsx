import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <h1>Welcome to the Home Page!</h1>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
