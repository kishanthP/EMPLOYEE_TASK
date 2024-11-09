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

    let submitForm = () => {
        let payload = {
            name, email, cnfPassword
        }
        if (!name || !email || !cnfPassword) {
            alert("To register, fill all the fields..!")
        } else {
            if (password === cnfPassword) {
                axios.post('http://localhost:4001/register', payload)
                    .then((e) => {
                        alert(e.data);
                        navigate("/")
                    })
                    .catch((e) => {
                        alert("Problem in sending data to the Backend..!");
                    })
            } else {
                alert("Both passwords should match..")
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-lg bg-black text-white p-8 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold mb-6">Admin Registration Form</h1>
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Retype Password"
                        type="password"
                        value={cnfPassword}
                        onChange={(e) => { setCnfPassword(e.target.value) }}
                        required
                    />
                    <button
                        className="w-full px-4 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={submitForm}
                    >
                        Register Me
                    </button>
                    <p className="text-center text-sm mt-4">
                        Already have an account? 
                        <span className="ml-2"></span>
                        <Button variant="outlined" className="ml-2">
                            <Link to="/" className="text-blue-500">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration
