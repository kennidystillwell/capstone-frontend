import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';

const Login = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <h1>Welcome to the Login!</h1>
                <LoginForm></LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Login;