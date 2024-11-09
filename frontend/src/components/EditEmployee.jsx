import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
  let [name, setName] = useState("")
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState()
  let [designation, setDesignation] = useState()
  let [gender, setGender] = useState()
  let [courses, setCourses] = useState([])

  let idObj = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:4001/employee-list/${idObj.ID}`)
      .then((e) => {
        setName(e.data.name);
        setEmail(e.data.email);
        setPhone(e.data.phone)
        setDesignation(e.data.designation)
        setGender(e.data.gender)
        setCourses(e.data.course)
      })
      .catch(() => { console.log("error"); })
  }, [idObj.ID])

  // checkBox handling
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter(course => course !== value));
    }
  };

  let formHandle = (e) => {
    e.preventDefault()
    let payload = {
      name: name,
      email: email,
      phone: phone,
      designation: designation,
      gender: gender,
      course: courses
    }
    axios.put(`http://localhost:4001/employee-list/${idObj.ID}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((e) => { alert(e.data); })
      .catch(() => { console.log("error"); })

    navigate("/employee-list")
  }

  return (
    <div className='max-w-3xl mx-auto bg-black p-8 shadow-lg rounded-lg mt-10'>
      <h1 className='text-center font-semibold text-3xl text-white mb-6'>Update Employee Data</h1>
      <form onSubmit={formHandle} className='space-y-6'>
        <div className='flex flex-col'>
          <label className='text-lg font-medium text-white'>Full Name</label>
          <input className='px-4 py-2 border border-gray-300 rounded-md mt-2 bg-black text-white placeholder-gray-500' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Full Name' required />
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-medium text-white'>Email</label>
          <input className='px-4 py-2 border border-gray-300 rounded-md mt-2 bg-black text-white placeholder-gray-500' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email' required />
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-medium text-white'>Phone Number</label>
          <input className='px-4 py-2 border border-gray-300 rounded-md mt-2 bg-black text-white placeholder-gray-500' type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder='Enter Phone Number' required />
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-medium text-white'>Designation</label>
          <select name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md mt-2 bg-black text-white">
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className='flex items-center space-x-6'>
          <label className='text-lg font-medium text-white'>Gender</label>
          <div className='flex items-center'>
            <input type="radio" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="male" className='ml-2 text-white'>Male</label>
          </div>
          <div className='flex items-center'>
            <input type="radio" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="female" className='ml-2 text-white'>Female</label>
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-medium text-white'>Courses</label>
          <div className='space-y-2'>
            <div className='flex items-center'>
              <input type="checkbox" id="MCA" name="course" value="MCA" checked={courses.includes('MCA')} onChange={handleCheckboxChange} />
              <label htmlFor="MCA" className='ml-2 text-white'>MCA</label>
            </div>
            <div className='flex items-center'>
              <input type="checkbox" id="BCA" name="course" value="BCA" checked={courses.includes('BCA')} onChange={handleCheckboxChange} />
              <label htmlFor="BCA" className='ml-2 text-white'>BCA</label>
            </div>
            <div className='flex items-center'>
              <input type="checkbox" id="BSC" name="course" value="BSC" checked={courses.includes('BSC')} onChange={handleCheckboxChange} />
              <label htmlFor="BSC" className='ml-2 text-white'>BSC</label>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <button type="submit" className='bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200'>Update Changes</button>
        </div>
      </form>
    </div>
  )
}

export default EditEmployee
