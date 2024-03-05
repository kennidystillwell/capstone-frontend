import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ResourceEvents from './components/ResourceEvents';
import ResourceArticles from './components/ResourceArticles';

const Resources = () => {
    return (
        <div>
            <NavBar />
            <ResourceArticles />
            <ResourceEvents />
            <Footer />
        </div>
    );
};

export default Resources;