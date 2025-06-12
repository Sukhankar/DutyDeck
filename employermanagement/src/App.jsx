import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/login.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'

function App() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const authData = useContext(AuthContext);

    useEffect(() => {
      if (authData) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
          setUser(loggedInUser.role);
          setUserName(loggedInUser.name || '');
        } else {
          setUser(null);
          setUserName('');
        }
      }
    }, [authData]);

    const handleLogin = (email, password) => {
        if (email === 'admin@me.com' && password === '12345678') {
            setUser('admin');
            setUserName('Admin');
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', name: 'Admin' }));
        } else if (
            authData &&
            authData.employees.find((e) => e.email === email && e.password === password)
        ) {
            const employee = authData.employees.find((e) => e.email === email && e.password === password);
            setUser('employee');
            setUserName(employee.name || 'Employee');
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', name: employee.name || 'Employee' }));
        } else {
            alert("Invalid credentials");
        }
    };

    const handleRegister = (email, password, name) => {
        if (
            authData &&
            !authData.employees.find((e) => e.email === email)
        ) {
            authData.addEmployee({ email, password, name });
            alert("Registration successful! Please login.");
        } else {
            alert("User already exists.");
        }
    };

    const handleForgotPassword = (email) => {
        if (
            authData &&
            authData.employees.find((e) => e.email === email)
        ) {
            alert("Password reset link sent to your email.");
        } else {
            alert("Email not found.");
        }
    };

    const handleLogout = () => {
      setUser(null);
      setUserName('');
      localStorage.removeItem('loggedInUser');
    };

    return (
        <>
            {!user && (
                <Login
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                    handleForgotPassword={handleForgotPassword}
                />
            )}
            {user === 'admin' && <AdminDashboard userName={userName} onLogout={handleLogout} />}
            {user === 'employee' && <EmployeeDashboard userName={userName} onLogout={handleLogout} />}
        </>
    );
}

export default App