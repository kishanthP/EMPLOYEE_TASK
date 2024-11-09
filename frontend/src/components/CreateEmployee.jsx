import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [designation, setDesignation] = useState('');
    let [gender, setGender] = useState('');
    let [course, setCourse] = useState([]);

    let formHandle = (e) => {
        e.preventDefault();
        let payload = {
            name: name,
            email: email,
            phone: phone,
            designation: designation,
            gender: gender,
            course: course,
        };

        if (!name || !email || !phone || !designation || !gender || !course) {
            alert('To Create Employee Fill all the fields..!');
        } else {
            axios
                .post('http://localhost:4001/employees', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((e) => {
                    alert(e.data);
                })
                .catch(() => {
                    console.log('Cannot register');
                });

            navigate('/employee-list');
        }
    };

    let handleCourseChange = (e) => {
        const course1 = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setCourse(course.concat(course1));
        } else {
            setCourse(course.filter((item) => item !== course1));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-black text-white shadow-lg rounded-lg">
            <h1 className="text-center text-3xl font-semibold mb-6">Create Employee</h1>
            <form className="space-y-6" onSubmit={formHandle}>
                <div className="flex flex-col space-y-4">
                    <input
                        className="bg-black border border-gray-600 text-white p-3 rounded-lg"
                        type="text"
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="bg-black border border-gray-600 text-white p-3 rounded-lg"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="bg-black border border-gray-600 text-white p-3 rounded-lg"
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    {/* Designation dropdown */}
                    <label className="font-semibold">Designation</label>
                    <select
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                        className="bg-black border border-gray-600 text-white p-3 rounded-lg"
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    {/* Gender radio buttons */}
                    <div className="space-x-2">
                        <label className="font-semibold">Gender</label><br />
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={gender === 'Male'}
                            onChange={() => setGender('Male')}
                            className="mr-2"
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={gender === 'Female'}
                            onChange={() => setGender('Female')}
                            className="mr-2"
                        />
                        <label htmlFor="female">Female</label>
                    </div>

                    {/* Courses checkboxes */}
                    <div className="space-y-1">
                        <label className="font-semibold">Courses</label><br />
                        <div className="space-x-2">
                            <input
                                type="checkbox"
                                id="MCA"
                                name="course"
                                value="MCA"
                                checked={course.includes('MCA')}
                                onChange={handleCourseChange}
                                className="mr-2"
                            />
                            <label htmlFor="MCA">MCA</label>
                            <input
                                type="checkbox"
                                id="BCA"
                                name="course"
                                value="BCA"
                                checked={course.includes('BCA')}
                                onChange={handleCourseChange}
                                className="mr-2"
                            />
                            <label htmlFor="BCA">BCA</label>
                            <input
                                type="checkbox"
                                id="BSC"
                                name="course"
                                value="BSC"
                                checked={course.includes('BSC')}
                                onChange={handleCourseChange}
                                className="mr-2"
                            />
                            <label htmlFor="BSC">BSC</label>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="text-center">
                        <button
                            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                            type="submit"
                        >
                            Register Me
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateEmployee;
