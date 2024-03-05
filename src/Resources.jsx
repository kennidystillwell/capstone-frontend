import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ResourceEvents from './components/ResourceEvents';
import ResourceArticles from './components/ResourceArticles';
import './css/Resources.css';

const Resources = () => {
    return (
        <div>
            <NavBar />
            <div className="resources-flex-container">
                <ResourceArticles />
                <ResourceEvents />
            </div>
            <Footer />
        </div>
    );
};

export default Resources;
