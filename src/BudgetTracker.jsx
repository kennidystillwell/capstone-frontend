import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const BudgetTracker = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <h1>Welcome to the Budget Tracker!</h1>
            </div>
            <Footer />
        </div>
    );
};

export default BudgetTracker;