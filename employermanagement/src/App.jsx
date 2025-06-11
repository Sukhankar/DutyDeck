import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/login.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'

function App() {
    const [user, setUser] = useState(null);
    const authData = useContext(AuthContext);

    useEffect(() => {
      if(authData ) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(loggedInUser) {
          setUser(loggedInUser.role);
        } else {
          setUser(null);
        }
      }
    }, [authData])
    

    const handleLogin = (email, password) => {
    // Simulate an API call to authenticate the user
        if(email== 'admin@me.com' && password == '123') {
            setUser('admin'); 
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));     
        }else if(authData && authData.employees.find((e) => e.email === email && e.password === password)){
            setUser('employee');
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee' }));    
        }
        else{
            alert("Invalid credentials");
        }
    }

    

  return (
    <>
    {!user?<Login handleLogin={handleLogin}/>: ''}
    {user == 'admin'? <AdminDashboard /> : <EmployeeDashboard />}
    {/* <AdminDashboard /> */}
    </>
  )
}

export default App