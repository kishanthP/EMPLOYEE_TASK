import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login = () => {
        let payload = { email, password }
        axios.post('http://localhost:4001/login', payload)
            .then((e) => {
                if (e.data.status === "success") {
                    navigate(`/dashboard/${e.data.id}`)
                }
                else if (e.data.status === "fail") {
                    alert("Wrong password")
                }
                else if (e.data.status === "noUser") {
                    alert("Invalid Email")
                }
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="max-w-lg w-full bg-black text-white p-8 rounded-lg shadow-2xl">
                <h1 className="text-center text-3xl font-semibold mb-6">Login Form</h1>
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        className="w-full px-4 py-3 border border-violet-400 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button
                        className="w-full px-4 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={login}
                    >
                        LOGIN
                    </button>
                    <p className="text-center text-sm mt-4">
                        Don't have an account? 
                        <span className="ml-2"></span>
                        <Button variant="outlined" className="ml-2">
                            <Link to='/register' className="text-blue-500">Sign Up</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
