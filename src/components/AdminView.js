import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import '../css/AdminTable.css'

export default function AdminView({ welcome }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/admin');
                const users = Object.values(response.data.users)
                setData(users);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, [])

    return (

        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <p className='welcomeText'>{welcome}</p>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Phone Number</th>
                                    <th>Security Question 1</th>
                                    <th>Answer to Security Question 1</th>
                                    <th>Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name || 'N/A'}</td>
                                        <td>{user.last_name || 'N/A'}</td>
                                        <td>{user.email || 'N/A'}</td>
                                        <td>{user.password || 'N/A'}</td>
                                        <td>{user.phoneNum || 'N/A'}</td>
                                        <td>{user.secuQues1 || 'N/A'}</td>
                                        <td>{user.answerSecuQues1 || 'N/A'}</td>
                                        <td>{user.admin === 1 ? 'True' : 'False'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </>
            )}
        </div>
    )
}
