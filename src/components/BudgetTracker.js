import React, { useState, useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, CategoryScale, Title, Legend } from 'chart.js';
import taxData from '../data/tax.json';
// Used for the dropdowns!!
import Select from 'react-select';
import '../css/Tracker.css';

import { useNavigate } from 'react-router-dom';

// Have to register stuff I want to use for Chart.js here and in the import above!
Chart.register(PieController, ArcElement, CategoryScale, Title, Legend);

// Options for the Select components
const payFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
  ];
  
  const payTypeOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'salary', label: 'Salary' },
  ];
  
  const stateOptions = [
    { value: 'Alabama', label: 'Alabama' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Arizona', label: 'Arizona' },
    { value: 'Arkansas', label: 'Arkansas' },
    { value: 'California', label: 'California' },
    { value: 'Colorado', label: 'Colorado' },
    { value: 'Connecticut', label: 'Connecticut' },
    { value: 'Delaware', label: 'Delaware' },
    { value: 'Florida', label: 'Florida' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Hawaii', label: 'Hawaii' },
    { value: 'Idaho', label: 'Idaho' },
    { value: 'Illinois', label: 'Illinois' },
    { value: 'Indiana', label: 'Indiana' },
    { value: 'Iowa', label: 'Iowa' },
    { value: 'Kansas', label: 'Kansas' },
    { value: 'Kentucky', label: 'Kentucky' },
    { value: 'Louisiana', label: 'Louisiana' },
    { value: 'Maine', label: 'Maine' },
    { value: 'Maryland', label: 'Maryland' },
    { value: 'Massachusetts', label: 'Massachusetts' },
    { value: 'Michigan', label: 'Michigan' },
    { value: 'Minnesota', label: 'Minnesota' },
    { value: 'Mississippi', label: 'Mississippi' },
    { value: 'Missouri', label: 'Missouri' },
    { value: 'Montana', label: 'Montana' },
    { value: 'Nebraska', label: 'Nebraska' },
    { value: 'Nevada', label: 'Nevada' },
    { value: 'New Hampshire', label: 'New Hampshire' },
    { value: 'New Jersey', label: 'New Jersey' },
    { value: 'New Mexico', label: 'New Mexico' },
    { value: 'New York', label: 'New York' },
    { value: 'North Carolina', label: 'North Carolina' },
    { value: 'North Dakota', label: 'North Dakota' },
    { value: 'Ohio', label: 'Ohio' },
    { value: 'Oklahoma', label: 'Oklahoma' },
    { value: 'Oregon', label: 'Oregon' },
    { value: 'Pennsylvania', label: 'Pennsylvania' },
    { value: 'Rhode Island', label: 'Rhode Island' },
    { value: 'South Carolina', label: 'South Carolina' },
    { value: 'South Dakota', label: 'South Dakota' },
    { value: 'Tennessee', label: 'Tennessee' },
    { value: 'Texas', label: 'Texas' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' },
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Washington', label: 'Washington' },
    { value: 'West Virginia', label: 'West Virginia' },
    { value: 'Wisconsin', label: 'Wisconsin' },
    { value: 'Wyoming', label: 'Wyoming' },
    { value: 'District of Columbia', label: 'District of Columbia' },
  ];

// BudgetTracker component
function BudgetTracker() {
  // Defining state variables using React's useState hook and setting their initial values to 0 or an empty string this will allow us to update them live >:3
  //Things deleted from the original code: alienStatus, maritalStatus, otherIncome, payDate, takehome, overtime, and benefits 
  //Many of these can be readded if needed but for now I will leave them out
  //may add option for user to state how many hours they work a week and then calculate the income based on that
  //Create goal for user to set and then calculate how much they need to save to reach that goal
  //Way for user to add expenses?!?!?! food, bills... etc
  const [income, setIncome] = useState(0);
  const [payFrequency, setPayFrequency] = useState('');
  const [payType, setPayType] = useState('');
  const [state, setState] = useState('');
  const [federalTaxes, setFederalTaxes] = useState(0);
  const [stateTaxes, setStateTaxes] = useState(0);
  const [finalIncome, setFinalIncome] = useState(0);
  const [inputIncome, setInputIncome] = useState(0);
  const navigate = useNavigate();
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
          labels: ['Income', 'Federal Taxes', 'State Taxes'],
          datasets: [{
            data: [finalIncome, federalTaxes, stateTaxes],
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
  }, [chartRef, income, federalTaxes, stateTaxes]);

    // Add a useEffect hook to update the state taxes whenever the income or state changes
    useEffect(() => {
        let adjustedIncome = income;
        let annualIncome = 0;
    
        if (payType === 'salary') {
            if (payFrequency === 'weekly') {
                adjustedIncome = inputIncome / 52;
                annualIncome = inputIncome;
            } else if (payFrequency === 'biweekly') {
                adjustedIncome = inputIncome / 26;
                annualIncome = inputIncome;
            }
        } else if (payType === 'hourly') {
            if (payFrequency === 'weekly') {
                adjustedIncome = inputIncome * 40;
                annualIncome = adjustedIncome * 52;
            } else if (payFrequency === 'biweekly') {
                adjustedIncome = inputIncome * 80;
                annualIncome = adjustedIncome * 26;
            }
        }
    
        setIncome(adjustedIncome); // Update income state variable
        setFinalIncome(annualIncome); // Update finalIncome state variable
    
        const stateData = taxData.states[state];
        let taxRate = 0;
        if (stateData) {
          for (let i = 0; i < stateData.length; i++) {
            if (i === stateData.length - 1) {
                taxRate = stateData[i].taxRate;
                break;
            }
            else if (annualIncome <= stateData[i].income) {
              taxRate = stateData[i -1].taxRate;
              break;
            }
          }
        }
    
        setStateTaxes(adjustedIncome * taxRate);
      }, [income, state, payType, payFrequency]);

      useEffect(() => {
        let adjustedIncome = income;
        let annualIncome = 0;

        if (payType === 'salary') {
            if (payFrequency === 'weekly') {
                adjustedIncome = inputIncome / 52;
                annualIncome = inputIncome;
            } else if (payFrequency === 'biweekly') {
                adjustedIncome = inputIncome / 26;
                annualIncome = inputIncome;
            }
        } else if (payType === 'hourly') {
            if (payFrequency === 'weekly') {
                adjustedIncome = inputIncome * 40;
                annualIncome = adjustedIncome * 52;
            } else if (payFrequency === 'biweekly') {
                adjustedIncome = inputIncome * 80;
                annualIncome = adjustedIncome * 26;
            }
        }
    
        const federalData = taxData.Federal;
        let taxRate = 0;
        if (federalData) {
          for (let i = 0; i < federalData.length; i++) {
            if (i === federalData.length - 1) {
                taxRate = federalData[i].taxRate;
                console.log(taxRate);
                console.log(adjustedIncome)
                break;
            }
            else if (annualIncome <= federalData[i].income) {
              taxRate = i > 0 ? federalData[i - 1].taxRate : federalData[i].taxRate;
              console.log(taxRate);
              console.log(adjustedIncome)
              break;
            }
          }
        }
    
        setFederalTaxes(adjustedIncome * taxRate);
    }, [income, payType, payFrequency]);


      return (
        <div className="BudgetTracker">
          <div className='Earnings'>
            <label>
              Income:
              <input type="number" value={inputIncome} onChange={(e) => setInputIncome(Number(e.target.value))}/>
            </label>
            <label>
              Pay Frequency:
              <Select
                options={payFrequencyOptions}
                value={payFrequencyOptions.find(option => option.value === payFrequency)}
                onChange={option => setPayFrequency(option.value)}
              />
            </label>
            <label>
              Pay Type:
              <Select
                options={payTypeOptions}
                value={payTypeOptions.find(option => option.value === payType)}
                onChange={option => setPayType(option.value)}
              />
            </label>
          </div>
          <div>
          <label>
              State:
              <Select
                options={stateOptions}
                value={stateOptions.find(option => option.value === state)}
                onChange={option => setState(option.value)}
              />
            </label>
          </div>
          <canvas ref={chartRef} />
          <button onClick={() => navigate('/summary', { state: { income, federalTaxes, stateTaxes, payFrequency, payType, state } })}>
  Go to Summary
</button>
        </div>
      );
}

export default BudgetTracker;