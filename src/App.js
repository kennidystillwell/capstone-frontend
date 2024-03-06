// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './Home';
import BudgetTracker from './BudgetTracker';
import Resources from './Resources';
import Login from './Login';
import SignUp from './SignUp';
import SummaryPage from './Summary';
import Admin from './Admin';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the application with AuthProvider */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: '1' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/budget-tracker' element={<BudgetTracker />} />
              <Route path='/resources' element={<Resources />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/summary' element={<SummaryPage />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
