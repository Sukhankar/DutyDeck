import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login.jsx'
import AdminRegister from './components/Auth/AdminRegister.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'

function App() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [showAdminRegister, setShowAdminRegister] = useState(false);
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

    const checkUserType = async (email, password) => {
      try {
        // First try admin login
        const adminResponse = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          return { type: 'admin', data: adminData };
        }

        // If admin login fails, try user login
        const userResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          return { type: 'employee', data: userData };
        }

        // If both fail, return null
        return null;
      } catch (error) {
        console.error('Login error:', error);
        return null;
      }
    };

    const handleLogin = async (email, password) => {
      const result = await checkUserType(email, password);
      
      if (result) {
        setUser(result.type);
        setUserName(result.data.user.name || '');
        localStorage.setItem('loggedInUser', JSON.stringify({
          role: result.type,
          name: result.data.user.name || '',
          id: result.data.user._id
        }));
      } else {
        alert('Login failed. Please check your credentials.');
      }
    };

    const handleUserRegister = async (email, password, name, organization) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, organization }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful! Please login.');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const handleAdminRegister = async (email, password, name) => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Admin registration successful! Please login.');
                setShowAdminRegister(false);
            } else {
                alert(data.message || 'Admin registration failed');
            }
        } catch (error) {
            console.error('Admin registration error:', error);
            alert('Admin registration failed. Please try again.');
        }
    };

    const handleForgotPassword = () => {
        alert("Password reset link sent to your email.");
    };

    const handleLogout = () => {
      setUser(null);
      setUserName('');
      localStorage.removeItem('loggedInUser');
    };

    return (
        <>
            {!user && !showAdminRegister && (
                <Login
                    handleUserLogin={handleLogin}
                    handleAdminLogin={handleLogin}
                    handleUserRegister={handleUserRegister}
                    handleForgotPassword={handleForgotPassword}
                    onAdminRegisterClick={() => setShowAdminRegister(true)}
                />
            )}
            {!user && showAdminRegister && (
                <AdminRegister
                    handleAdminRegister={handleAdminRegister}
                    onBackToLogin={() => setShowAdminRegister(false)}
                />
            )}
            {user === 'admin' && <AdminDashboard userName={userName} onLogout={handleLogout} />}
            {user === 'employee' && <EmployeeDashboard userName={userName} onLogout={handleLogout} />}
        </>
    );
}

export default App