import React from 'react';
import ResourceEvents from './components/ResourceEvents';
import ResourceArticles from './components/ResourceArticles';
import './css/Resources.css';

const Resources = () => {
    return (
        <div>
            <div className="resources-flex-container">
                <ResourceArticles />
                <ResourceEvents />
            </div>
        </div>
    );
};

export default Resources;
