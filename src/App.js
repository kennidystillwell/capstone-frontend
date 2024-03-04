// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider component
import Home from './Home';
import BudgetTracker from './BudgetTracker';
import Resources from './Resources';
import Login from './Login';
import SignUp from './SignUp';
import SummaryPage from './Summary';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the application with AuthProvider */}
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
      </AuthProvider>
    </Router>
  );
}

export default App;
