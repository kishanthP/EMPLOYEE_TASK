import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login=()=>{
        let payload = {email, password}
        axios.post('http://localhost:4001/login', payload)
        .then((e)=>{
            if(e.data.status === "success"){
                navigate(`/dashbord/${e.data.id}`)
            }
            else if(e.data.status === "fail"){
                alert("wrong password")
            }
            else if(e.data.status === "noUser"){
                alert("Invalid Email")
            }
        })
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='max-w-md w-full bg-white shadow-xl rounded-lg p-8'>
                <h1 className='text-center font-bold text-3xl mb-6 text-gray-800'>Login Form</h1>
                <div className='space-y-4'> 
                <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={login}>LOGIN</button>
                <br />
                <div className="text-center mt-4">
                <p className="text-gray-600">do not have Account?{''} <Button variant="outlined" color="primary"><Link to='/register' className='text-blue-600'> Sign Up</Link></Button> </p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login