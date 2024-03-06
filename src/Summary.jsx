import React from 'react';
import Summary from './components/SummaryPage'
import './css/summary.css'; // Import the CSS file

const BudgetTracker = () => {
    return (
        <div>
            <div className="container">
                <h1>Welcome to the Summary!</h1>
            </div>
            <Summary /> 
        </div>
    );
};

export default BudgetTracker;