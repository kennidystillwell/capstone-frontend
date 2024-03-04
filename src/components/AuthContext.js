import React, { createContext, useContext, useState } from 'react';

//create context for authentication
const AuthContext = createContext();

//custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

//authProvider component to wrap the application and provide authentication context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user information

  //function to set user upon successful login
  const login = (userData) => {
    setUser(userData);
  };

  //function to clear user upon logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
