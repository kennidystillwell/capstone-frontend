import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import BudgetTracker from './BudgetTracker';
import Resources from './Resources';
import Login from './Login';
import Footer from "./components/Footer";
import SignUp from './SignUp';
import SummaryPage from './Summary';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/budget-tracker' element={<BudgetTracker />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element= {<SignUp />} />
          <Route path='/summary' element={<SummaryPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
