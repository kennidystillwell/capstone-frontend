import React, { useState, useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, CategoryScale, Title, Legend, Tooltip } from 'chart.js';
import taxData from '../data/tax.json';
import Select from 'react-select';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

// Have to register stuff I want to use for Chart.js here and in the import above!
Chart.register(PieController, ArcElement, CategoryScale, Title, Legend, Tooltip);

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
  const [income, setIncome] = useState(0);
  const [payFrequency, setPayFrequency] = useState('');
  const [payType, setPayType] = useState('');
  const [state, setState] = useState('');
  const [federalTaxes, setFederalTaxes] = useState(0);
  const [stateTaxes, setStateTaxes] = useState(0);
  const [finalIncome, setFinalIncome] = useState(0);
  const [inputIncome, setInputIncome] = useState(0);
  const [food, setFood] = useState(0);
  const [rent, setRent] = useState(0);
  const [car, setCar] = useState(0);
  const [phone, setPhone] = useState(0);
  const [internet, setInternet] = useState(0);
  const [gas, setGas] = useState(0);
  const [other, setOther] = useState(0);
  const [budgetStartDate, setBudgetStartDate] = useState('');
  const [payDateEndDate, setPayDateEndDate] = useState('');
  const [goal, setGoal] = useState({
    name: '',
    frequency: '',
    amount: 0,
    total: 0,
  });
  const [expenses, setExpenses] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);

  const navigate = useNavigate();
  // useRef hook to reference the chart element 
  const chartRef = useRef(null);
  // useRef hook to reference the chart instance 
  const chartInstanceRef = useRef(null);

  //Calculate the total expenses
  useEffect(() => {
    setExpenses(Number(food) + Number(rent) + Number(car) + Number(phone) + Number(internet) + Number(gas) + Number(other));
  }, [food, rent, car, phone, internet, gas, other]);

  useEffect(() => {
    setRemainingIncome(finalIncome - expenses - federalTaxes - stateTaxes);
    console.log('Remaining Income:', remainingIncome)
    console.log('Final Income:', finalIncome)
  }, [finalIncome, expenses, federalTaxes, stateTaxes]);


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
          labels: ['Income', 'Federal Taxes', 'State Taxes', 'Expenses'],
          datasets: [{
            data: [remainingIncome, federalTaxes, stateTaxes, expenses],
            backgroundColor: ['pink', 'purple', 'orange', 'yellow', 'blue']
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 25, // Adjust this value to change the size of the labels
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  var label = context.label || '';
  
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }
  }, [chartRef, remainingIncome, federalTaxes, stateTaxes, expenses, finalIncome]);

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
    setFinalIncome(adjustedIncome);

    const stateData = taxData.states[state];
    let taxRate = 0;
    if (stateData) {
        for (let i = 0; i < stateData.length; i++) {
            if (i === stateData.length - 1) {
                taxRate = stateData[i].taxRate;
                break;
            } else if (annualIncome <= stateData[i].income) {
                taxRate = stateData[i - 1].taxRate;
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
                
                break;
            } else if (annualIncome <= federalData[i].income) {
                taxRate = i > 0 ? federalData[i - 1].taxRate : federalData[i].taxRate;
                
                break;
            }
        }
    }

    setFederalTaxes(adjustedIncome * taxRate);
}, [income, payType, payFrequency]);

return (
  <div className="tracker">
    <div className="form-tracker">
      <Tabs defaultActiveKey="income" className="flex-grow-1 tabs">
        <Tab eventKey="income" title="Income">
          <label>
            Income:
            <input type="number" value={inputIncome} onChange={(e) => setInputIncome(Number(e.target.value))} />
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
          <label>
            State:
            <Select
              options={stateOptions}
              value={stateOptions.find(option => option.value === state)}
              onChange={option => setState(option.value)}
            />
          </label>
          <label>
            Budget Start Date:
            <input type="date" value={budgetStartDate} onChange={e => setBudgetStartDate(e.target.value)} />
          </label>
          <label>
            Pay Date End Date:
            <input type="date" value={payDateEndDate} onChange={e => setPayDateEndDate(e.target.value)} />
          </label>
        </Tab>

        <Tab eventKey="expenses" title="Expenses">
          <label>
            Food:
            <input type="number" value={food} onChange={e => setFood(e.target.value)} />
          </label>
          <label>
            Rent:
            <input type="number" value={rent} onChange={e => setRent(e.target.value)} />
          </label>
          <label>
            Car:
            <input type="number" value={car} onChange={e => setCar(e.target.value)} />
          </label>
          <label>
            Phone:
            <input type="number" value={phone} onChange={e => setPhone(e.target.value)} />
          </label>
          <label>
            Internet:
            <input type="number" value={internet} onChange={e => setInternet(e.target.value)} />
          </label>
          <label>
            Gas:
            <input type="number" value={gas} onChange={e => setGas(e.target.value)} />
          </label>
          <label>
            Other:
            <input type="number" value={other} onChange={e => setOther(e.target.value)} />
          </label>
        </Tab>

        <Tab eventKey="goal" title="Goal">
          <label>
            Goal Name:
            <input type="text" value={goal.name} onChange={e => setGoal(prevGoal => ({ ...prevGoal, name: e.target.value }))} />
          </label>
          <label>
            Goal Frequency:
            <input type="text" value={goal.frequency} onChange={e => setGoal(prevGoal => ({ ...prevGoal, frequency: e.target.value }))} />
          </label>
          <label>
            Goal Contribution Amount:
            <input type="number" value={goal.amount} onChange={e => setGoal(prevGoal => ({ ...prevGoal, amount: e.target.value }))} />
          </label>
          <label>
            Goal Total Amount:
            <input type="number" value={goal.total} onChange={e => setGoal(prevGoal => ({ ...prevGoal, total: e.target.value }))} />
          </label>
        </Tab>
      </Tabs>
      <button className="summary-button" onClick={() => navigate('/summary', { state: { income, federalTaxes, stateTaxes, payFrequency, payType, state, expenses, remainingIncome } })}> Go to Summary </button>
    </div>
    <div className="chart-tracker">
  <canvas ref={chartRef} />
</div>
  </div>
);
}


export default BudgetTracker;