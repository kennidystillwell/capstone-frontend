import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Tracker from './components/BudgetTracker'
import './css/Tracker.css'

const BudgetTracker = () => {
    return (
        <div className='hi'>
            <NavBar />
                
            <Tracker /> 
            <Footer />
        </div>
    );
};

export default BudgetTracker;