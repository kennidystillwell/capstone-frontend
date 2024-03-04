import React from 'react';
import { useLocation } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  const { income = 0, federalTaxes = 0, stateTaxes = 0, payFrequency = '', payType = '', state = '', expenses = 0 } = location.state;
  const finalAmount = (income - federalTaxes - stateTaxes - expenses).toFixed(2);

  console.log('Props received by SummaryPage:', { income, federalTaxes, stateTaxes, payFrequency, payType, state, expenses });

  return (
    <div>
      <h2>Summary</h2>
      <p>Income: {income}</p>
      <p>Federal Taxes: {federalTaxes.toFixed(2)}</p>
      <p>State Taxes: {stateTaxes.toFixed(2)}</p>
      <p>Pay Frequency: {payFrequency}</p>
      <p>Pay Type: {payType}</p>
      <p>State: {state}</p>
      <p>Expenses: {expenses}</p>
      <h2>Final Amount: {finalAmount}</h2>
    </div>
  );
};

export default SummaryPage;