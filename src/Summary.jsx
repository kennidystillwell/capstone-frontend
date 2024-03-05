import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Summary from './components/SummaryPage'
import './css/summary.css'; // Import the CSS file

const BudgetTracker = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <h1>Welcome to the Summary!</h1>
            </div>
            <Summary /> 
            <Footer />
        </div>
    );
};

export default BudgetTracker;