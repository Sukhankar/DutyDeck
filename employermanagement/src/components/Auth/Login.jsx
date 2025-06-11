import React, { useState } from 'react'

const Login = ({handleLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        // Reset form fields
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    }


  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className='border p-10 bg-transparent opacity-70 rounded shadow-md w-96'>
            <form onSubmit={(e)=>{
                submitHandler(e);
            }} className='flex flex-col items-center justify-center gap-4'>
                <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className='text-black outline-none border-2 xt-xl py-3 px-5 rounded-full' type="email" placeholder='Enter your email' />
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className='text-black outline-none border-2 xt-xl py-3 px-5 rounded-full' type="password" placeholder='Enter password' />
                <button className='bg-blue-500 text-white xt-xl px-4 py-2 rounded-3xl hover:bg-blue-600'>Login</button>

            </form>

        </div>
   </div>
   </>
  )
}

export default Login