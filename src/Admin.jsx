import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminView from './components/AdminView';

export default function Admin() {
    const location = useLocation();
    const welcome = location.state && location.state.welcome;
    return (
        <div>
            <AdminView welcome={welcome} />

        </div>
    )
}
