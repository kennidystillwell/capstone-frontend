import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import '../css/AdminTable.css'

export default function AdminView({ welcome }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    const [selectUser, setSelectUser] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/admin');
                const users = Object.values(response.data.users)
                setData(users);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [])

    const handleUserClicked = (user) => {
        setSelectUser(user)
    }

    const handleSubmit = async (updatedUserData) => {
        try {
            const response = await axios.put('http://localhost:5000/update', updatedUserData)
            if (response.status === 200) {
                setData(prevData => prevData.map(user => user.id === updatedUserData.id ? updatedUserData : user));
                setSelectUser(null);
                setSelectUser(null);
            }

        } catch (error) {
            setError(error)
        }
    }

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
                                    <tr key={user.id} onClick={() => handleUserClicked(user)}>
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
                    {selectUser && (
                        <UserForm
                            user={selectUser}
                            onSubmit={handleSubmit}
                            onClose={() => setSelectUser(null)}
                        />
                    )}

                </>
            )}
        </div>
    )
}

function UserForm({ user, onSubmit, onClose }) {
    const [userData, setUserData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userData);
    };
    return (
        <div className="user-form">
            <h2>Modify User Data</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="first_name"
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNum"
                        value={userData.phoneNum}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Security Question:
                    <input
                        type="text"
                        name="secuQues1"
                        value={userData.secuQues1}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Answer to Security Question:
                    <input
                        type="number"
                        min='0'
                        max='1'
                        name="answerSecuQues1"
                        value={userData.answerSecuQues1}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Admin:
                    <input
                        type="text"
                        name="admin"
                        value={userData.admin}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}