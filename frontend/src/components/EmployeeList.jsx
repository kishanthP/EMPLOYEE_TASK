import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const EmployeeList = () => {
    let [infoFromDB, setinfoFromDB] = useState([])
    let [reload, setReload] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:4001/employee-list")
            .then((e) => {
                setinfoFromDB(e.data)
            })
            .catch((e) => {
                console.log("error from EmployeeList useEffect");
            })
        setReload(1)
    }, [reload])

    let deleteUser = (e) => {
        axios.delete(`http://localhost:4001/employee-list/${e}`)
        setReload(2)
    }

    return (
        <div className='w-full p-4 bg-black'>
            <div className='mb-6'>
                <p className='text-xl font-semibold text-white'>Total Count: {infoFromDB.length}</p>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-800">
                <table className="min-w-full table-auto text-sm text-white">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className='px-6 py-3 text-left'>Unique Id</th>
                            <th className='px-6 py-3 text-left'>Name</th>
                            <th className='px-6 py-3 text-left'>Email</th>
                            <th className='px-6 py-3 text-left'>Phone</th>
                            <th className='px-6 py-3 text-left'>Designation</th>
                            <th className='px-6 py-3 text-left'>Gender</th>
                            <th className='px-6 py-3 text-left'>Course</th>
                            <th className='px-6 py-3 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {infoFromDB.map((item, i) => (
                            <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-600">
                                <td className='px-6 py-3'>{i + 1}</td>
                                <td className='px-6 py-3'>{item.name}</td>
                                <td className='px-6 py-3'>{item.email}</td>
                                <td className='px-6 py-3'>{item.phone}</td>
                                <td className='px-6 py-3'>{item.designation}</td>
                                <td className='px-6 py-3'>{item.gender}</td>
                                <td className='px-6 py-3'>{item.course[0]}, {item.course[1]}</td>
                                <td className='px-6 py-3 text-center'>
                                    <Link to={`/edit-employee/${item._id}`} className="text-blue-400 hover:underline mr-4">Edit</Link>
                                    <Button variant="outlined" color="error" onClick={() => { deleteUser(item._id) }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList
