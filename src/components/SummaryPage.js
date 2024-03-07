import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {Chart} from 'chart.js';

function SummaryPage() {
  const location = useLocation();
  const { income = 0, federalTaxes = 0, stateTaxes = 0, payFrequency = '', payType = '', state = '', expenses = 0, goalAmount = 0, remainingIncome = 0 } = location.state;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ['Final Amount', 'Federal Taxes', 'State Taxes', 'Expenses', 'Goal'],
          datasets: [{
            data: [remainingIncome, federalTaxes, stateTaxes, expenses, goalAmount],
            backgroundColor: ['green', 'blue', 'yellow', 'red', 'purple'],
          }],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  var label = context.label || '';
  
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                  }
                  return label;
                }
              }
            }
          }
        }
      });
      return () => chartInstance.destroy();
    }
  }, [remainingIncome, federalTaxes, stateTaxes, expenses, goalAmount]);

  console.log('Props received by SummaryPage:', { income, federalTaxes, stateTaxes, payFrequency, payType, state, expenses });

  return (
    <div className="tracker">
      <div className="summary-content">
        <h2>Summary</h2>
        <p>Income: {income.toFixed(2)}</p>
        <p>Federal Taxes: {federalTaxes.toFixed(2)}</p>
        <p>State Taxes: {stateTaxes.toFixed(2)}</p>
        <p>Pay Frequency: {payFrequency}</p>
        <p>Pay Type: {payType}</p>
        <p>State: {state}</p>
        <p>Expenses: {expenses}</p>
        <p>Goal Amount: {goalAmount}</p>
        <h2>Final Amount: {remainingIncome.toFixed(2)}</h2>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default SummaryPage;