import React, { useState } from "react";
import { api } from "../api";

const referralTypes = ["TU1", "TU2", "TU3", "TU4", "ORTHO"];
const dentalIssues = ["DECAY", "ABSCESS", "ORTHO", "OTHERS"];

const EditReferral = ({ referral, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        schoolYear: referral.schoolYear || "",
        currentDentist: referral.currentDentist || "",
        language: referral.language || "",
        dateEmailed: referral.dateEmailed
            ? new Date(referral.dateEmailed).toISOString().slice(0, 10)
            : "",
        dateCalled: referral.dateCalled
            ? new Date(referral.dateCalled).toISOString().slice(0, 10)
            : "",
        dentalIssue: referral.dentalIssue || "",
        typeOfReferral: referral.typeOfReferral || "",
        notes: referral.notes || "",
        createdBy: referral.createdBy || "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.put(`/referrals/${referral._id}`, formData);
            onUpdate(res.data);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to update referral. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Communication</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* School Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
                        <input
                            type="text"
                            name="schoolYear"
                            value={formData.schoolYear}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        />
                    </div>

                    {/* Current Dentist */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Dentist</label>
                        <input
                            type="text"
                            name="currentDentist"
                            value={formData.currentDentist}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        />
                    </div>

                    {/* Dates */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Emailed</label>
                            <input
                                type="date"
                                name="dateEmailed"
                                value={formData.dateEmailed}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Called</label>
                            <input
                                type="date"
                                name="dateCalled"
                                value={formData.dateCalled}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Dental Issue as Radio Buttons */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dental Issue</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {dentalIssues.map((issue) => (
                                <label key={issue} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dentalIssue"
                                        value={issue}
                                        checked={formData.dentalIssue === issue}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{issue}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Type of Referral */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Referral</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {referralTypes.map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="typeOfReferral"
                                        value={type}
                                        checked={formData.typeOfReferral === type}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        />
                    </div>

                    {/* Created By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                        <input
                            type="text"
                            name="createdBy"
                            value={formData.createdBy}
                            readOnly
                            className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReferral;
