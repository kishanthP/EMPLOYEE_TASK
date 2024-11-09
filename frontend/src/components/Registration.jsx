import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [cnfPassword, setCnfPassword] = useState('')
    let navigate = useNavigate()

    let submitForm =()=>{
        let payload = {
            name,email,cnfPassword
        }
        if(!name || !email || !cnfPassword){
            alert("To register Fill all the fields..!")
        }
        else{
            if(password === cnfPassword ){
                axios.post('http://localhost:4001/register', payload)
            .then((e)=>{
                alert(e.data);
                navigate("/")
            })
            .catch((e)=>{
                alert("problem in sending data to the Backend.!");
            })
            }
            else{
                alert("both password should be matched..")
            }
            
        }
    }

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className=' bg-white shadow-xl rounded-lg w-full max-w-lg p-8'>
                <h1 className='text-center text-3xl font-bold text-gray-700 mb-6'>Admin Registration Form</h1>
                <div className='space-y-4'>
                    <input className='w-full px-4 py-2 border-2 border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Enter Full Name' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required />
                    <input required  className='w-full px-4 py-2 border-2 border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Enter Email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <input required  className='w-full px-4 py-2 border-2 border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Enter Password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input className='w-full px-4 py-2 border-2 border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Retype Password' type="password" value={cnfPassword} onChange={(e)=>{setCnfPassword(e.target.value)}}/>
                    <button className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300' onClick={submitForm}>Register Me</button>
                    <p className='text-center text-gray-600'>already have Account? <Button variant="outlined" className='mt-3'><Link to='/' className='text-blue-600'> Sign In</Link></Button> </p>
                </div>
            </div>
        </div>
    )
}

export default Registration