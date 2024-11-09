import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';

const DashBord = () => {
  let [name, setname] = useState("")
  let ID = useParams()

  useEffect(() => {
    axios.get(`http://localhost:4001/user/${ID.ID}`)
      .then((e) => {
        setname(e.data)
      })
      .catch(() => { console.log("Unable to fetch data in Edit component"); })
  }, [ID.ID])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div id='navbar' className='bg-gray-900 shadow-md'>
        <ul className='flex justify-between items-center px-6 py-4 md:px-10 md:py-5'>
          <li className="text-xl font-semibold text-blue-500">Dashboard</li>
          <li className='flex gap-6 md:gap-10 items-center'>
            <Button variant="text" className="text-blue-500"><Link to='/create-employee'>Create Employee</Link></Button>
            <Button variant="text" className="text-blue-500"><Link to="/employee-list">Employee List</Link></Button>
            <span className='px-4 py-2 text-red-500 border border-dashed border-red-400 rounded-lg font-medium'>{name}</span>
            <Button variant="text" className="text-blue-500">Logout</Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-white mt-6 text-xl md:text-2xl font-medium text-center">Welcome to the admin panel</p>
      </div>
    </div>
  )
}

export default DashBord
