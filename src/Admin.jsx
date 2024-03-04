import React from 'react'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import AdminView from './components/AdminView';

export default function Admin() {
    const location = useLocation();
    const welcome = location.state && location.state.welcome;
    return (
        <div>
            <NavBar />
            <AdminView welcome={welcome} />

            <Footer />
        </div>
    )
}
