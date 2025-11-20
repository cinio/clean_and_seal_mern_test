// src/components/ReferralForm.js
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import ReferralTable from './ReferralTable';

const ReferralForm = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [formData, setFormData] = useState({
        schoolYear: '2025 - 2026',
        currentDentist: '',
        language: 'English',
        dateEmailed: '',
        dateCalled: '',
        dentalIssue: '',
        typeOfReferral: '',
        notes: '',
        createdBy: '',
    });

    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get('/students');
                setStudents(res.data);
            } catch (err) {
                console.log('Error fetching students', err);
            }
        };
        fetchStudents();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent) return alert("Please select a student");
        try {
            await api.post('/referrals', { ...formData, student: selectedStudent });
            setFormData({
                schoolYear: '2025 - 2026',
                currentDentist: '',
                language: 'English',
                dateEmailed: '',
                dateCalled: '',
                dentalIssue: '',
                typeOfReferral: '',
                notes: '',
                createdBy: 'Nurse',
            });
            setRefreshFlag(!refreshFlag);
        } catch (err) {
            alert('Error saving referral');
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Form Card */}
            <div className="bg-white shadow-md rounded-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Communication Form</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                            <select
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            >
                                <option value="">Select a student</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
                            <input type="text" name="schoolYear" value={formData.schoolYear} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Dentist</label>
                            <input type="text" name="currentDentist" value={formData.currentDentist} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <input type="text" name="language" value={formData.language} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Emailed</label>
                            <input type="date" name="dateEmailed" value={formData.dateEmailed} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Called</label>
                            <input type="date" name="dateCalled" value={formData.dateCalled} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Dental Issue as Radio Buttons */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dental Issue</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {["DECAY", "ABSCESS", "ORTHO", "OTHERS"].map((issue) => (
                                    <label key={issue} className="flex items-center cursor-pointer space-x-2">
                                        <input
                                            type="radio"
                                            name="dentalIssue"
                                            value={issue}
                                            checked={formData.dentalIssue === issue}
                                            onChange={handleChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="text-gray-700">{issue}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Referral</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {["TU1", "TU2", "TU3", "TU4", "ORTHO"].map((type) => (
                                    <label key={type} className="flex items-center cursor-pointer space-x-2">
                                        <input
                                            type="radio"
                                            name="typeOfReferral"
                                            value={type}
                                            checked={formData.typeOfReferral === type}
                                            onChange={handleChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="text-gray-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" rows={3} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                            <input
                                type="text"
                                name="createdBy"
                                value={formData.createdBy}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            />
                        </div>

                        <div className="text-right mt-4">
                            <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition">Save Referral</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Table */}
            <ReferralTable refreshFlag={refreshFlag} studentId={selectedStudent} />
        </div>
    );
}

export default ReferralForm;
