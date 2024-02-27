import React, { useState, useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, CategoryScale, Title, Legend } from 'chart.js';
import '../css/Tracker.css';

// Have to register stuff I use for Chart.js
Chart.register(PieController, ArcElement, CategoryScale, Title, Legend);

// BudgetTracker component
function BudgetTracker() {
  // Defining state variables using React's useState hook and setting their initial values to 0 or an empty string this will allow us to update them live >:3
  const [income, setIncome] = useState(0);
  const [payFrequency, setPayFrequency] = useState('');
  const [payType, setPayType] = useState('');
  const [overtime, setOvertime] = useState(0);
  const [payDate, setPayDate] = useState('');
  const [alienStatus, setAlienStatus] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [otherIncome, setOtherIncome] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [state, setState] = useState('');
  const [federalTaxes, setFederalTaxes] = useState(0);
  const [stateTaxes, setStateTaxes] = useState(0);
  const [benefits, setBenefits] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  // useRef hook to reference the chart element 
  const chartRef = useRef(null);
  // useRef hook to reference the chart instance 
  const chartInstanceRef = useRef(null);

  // Using React's useEffect hook to update the chart when state variables change 
  useEffect(() => {
    if (chartRef.current) {
        // Destroy the old chart instance if it exists 
      if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
      }
      // Create a new chart instance with the updated state variables and store it in chartInstanceRef
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ['Income', 'Federal Taxes', 'State Taxes', 'Benefits', 'Take Home'],
          datasets: [{
            data: [income, federalTaxes, stateTaxes, benefits, takeHome],
            backgroundColor: ['pink', 'purple', 'orange', 'yellow', 'blue']
          }]
        },
        // Chart options if I want to add any plugins here I will also need to add them in the Chart.register() call at the top of the file !!!
        //From what I saw there was no option for datalabels on chart.js but I have to check more but we may need another library for that!
        options: {
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Budget',
              }
            }
          }
      });
    }
  }, [chartRef, income, federalTaxes, stateTaxes, benefits, takeHome]);

  return (
    //I made most of these default inputs some of them def need to be fixed to dropdowns or something else but I will do that later just wanted base function of a budget tracker
    <div className="BudgetTracker">
      <div>
        <label>
          Income:
          <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} />
        </label>
        <label>
          Pay Frequency:
          <input type="text" value={payFrequency} onChange={e => setPayFrequency(e.target.value)} />
        </label>
        <label>
          Pay Type:
          <input type="text" value={payType} onChange={e => setPayType(e.target.value)} />
        </label>
        <label>
          Overtime:
          <input type="number" value={overtime} onChange={e => setOvertime(Number(e.target.value))} />
        </label>
        <label>
          Pay Date:
          <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Alien Status:
          <input type="text" value={alienStatus} onChange={e => setAlienStatus(e.target.value)} />
        </label>
        <label>
          Marital Status:
          <input type="text" value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} />
        </label>
        <label>
          Other Income:
          <input type="number" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} />
        </label>
        <label>
          Dependents:
          <input type="number" value={dependents} onChange={e => setDependents(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          State:
          <input type="text" value={state} onChange={e => setState(e.target.value)} />
        </label>
        <label>
          Federal Taxes:
          <input type="number" value={federalTaxes} onChange={e => setFederalTaxes(Number(e.target.value))} />
        </label>
        <label>
          State Taxes:
          <input type="number" value={stateTaxes} onChange={e => setStateTaxes(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Benefits:
          <input type="number" value={benefits} onChange={e => setBenefits(Number(e.target.value))} />
        </label>
        <label>
          Take Home:
          <input type="number" value={takeHome} onChange={e => setTakeHome(Number(e.target.value))} />
        </label>
      </div>
      <canvas ref={chartRef} />
    <div>
      <h2>Summary</h2>
      <p>Income: {income}</p>
      <p>Federal Taxes: {federalTaxes}</p>
      <p>State Taxes: {stateTaxes}</p>
      <p>Benefits: {benefits}</p>
      <p>Take Home: {takeHome}</p>
      <h2>Final Amount: {income - federalTaxes - stateTaxes - benefits}</h2>
    </div>
    </div>
  );
}

export default BudgetTracker;