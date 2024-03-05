import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {Chart} from 'chart.js';

function SummaryPage() {
  const location = useLocation();
  const { income = 0, federalTaxes = 0, stateTaxes = 0, payFrequency = '', payType = '', state = '', expenses = 0 } = location.state;
  const finalAmount = (income - federalTaxes - stateTaxes - expenses).toFixed(2);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ['Final Amount', 'Federal Taxes', 'State Taxes', 'Expenses'],
          datasets: [{
            data: [finalAmount, federalTaxes, stateTaxes, expenses],
            backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,206,86,0.6)', 'rgba(153,102,255,0.6)'],
          }],
        },
      });
      return () => chartInstance.destroy();
    }
  }, [finalAmount, federalTaxes, stateTaxes, expenses]);

  console.log('Props received by SummaryPage:', { income, federalTaxes, stateTaxes, payFrequency, payType, state, expenses });

  return (
    <div className="tracker">
      <div className="summary-content">
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
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default SummaryPage;