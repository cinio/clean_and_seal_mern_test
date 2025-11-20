import React, { useEffect, useState } from "react";
import { api } from "../api";

const referralTypes = ["TU1", "TU2", "TU3", "TU4", "ORTHO"];
const dentalIssues = ["DECAY", "ABSCESS", "ORTHO", "OTHERS"];

const CaseManagement = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [filters, setFilters] = useState({});
    const [selectedReferral, setSelectedReferral] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, referralsRes] = await Promise.all([
                    api.get("/students"),
                    api.get("/referrals"),
                ]);

                const combined = referralsRes.data.map((ref) => {
                    const student = ref.student || {};
                    return {
                        ...ref,
                        studentName: student.name || "",
                        gender: student.gender || "",
                        insurance: student.insurance || "",
                        parent: student.guardian || "",
                        phone: student.phone || "",
                        email: student.email || "",
                        language: student.language || "",
                    };
                });

                setCombinedData(combined);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (e, key) => {
        setFilters((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const filteredData = combinedData.filter((row) =>
        Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            let cell = row[key] || "";
            if (key === "dateEmailed" || key === "dateCalled") {
                cell = cell ? new Date(cell).toISOString().slice(0, 10) : "";
            }
            return cell.toString().toLowerCase().includes(value.toLowerCase());
        })
    );

    const truncate = (text, length = 30) =>
        text && text.length > length ? text.slice(0, length) + "..." : text || "";

    return (
        <div className="max-w-full p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Case Management
            </h2>

            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
                <table className="min-w-[1400px] divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                "Date of Service",
                                "Student Name",
                                "Gender",
                                "Insurance",
                                "Parent / Guardian",
                                "Phone Number",
                                "Email",
                                "Language",
                                "Current Dentist",
                                "Referral Type",
                                "Decay Tooth",
                                "Pain / Abscess",
                                "Referral Reason",
                                "Date Called",
                                "Called By",
                                "Notes",
                                "Additional Note",
                                "Communication",
                            ].map((col) => (
                                <th
                                    key={col}
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>

                        {/* Filter row */}
                        <tr className="bg-gray-50">
                            {[
                                "dateEmailed",
                                "studentName",
                                "gender",
                                "insurance",
                                "parent",
                                "phone",
                                "email",
                                "language",
                                "currentDentist",
                                "typeOfReferral",
                                null,
                                null,
                                null,
                                "dateCalled",
                                null,
                                null,
                                null,
                                null,
                            ].map((key, idx) => (
                                <th key={idx} className="px-2 py-1 text-sm">
                                    {key ? (
                                        <input
                                            type={key.includes("date") ? "date" : "text"}
                                            placeholder="Filter"
                                            value={filters[key] || ""}
                                            onChange={(e) => handleFilterChange(e, key)}
                                            className="input input-sm input-bordered w-full bg-white"
                                        />
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((row) => (
                            <tr
                                key={row._id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelectedReferral(row)}
                            >
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.dateEmailed
                                        ? new Date(row.dateEmailed).toLocaleDateString()
                                        : ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.studentName}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.gender}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.insurance}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.parent}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.phone}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.email}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.language}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.currentDentist}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.typeOfReferral}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.decayTooth || ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.painOrAbscess || ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.referralReason || ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.dateCalled
                                        ? new Date(row.dateCalled).toLocaleDateString()
                                        : ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.calledBy || ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.notes ? truncate(row.notes) : ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.additionalNote ? truncate(row.additionalNote) : ""}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                                    {row.communication ? "Yes" : ""}
                                </td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={18} className="px-4 py-6 text-center text-gray-500">
                                    No case data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Read-only Referral Modal */}
            {selectedReferral && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Communication Section
                        </h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    School Year
                                </label>
                                <input
                                    type="text"
                                    value={selectedReferral.schoolYear || ""}
                                    readOnly
                                    className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Dentist
                                </label>
                                <input
                                    type="text"
                                    value={selectedReferral.currentDentist || ""}
                                    readOnly
                                    className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    value={selectedReferral.language || ""}
                                    readOnly
                                    className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                />
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date Emailed
                                    </label>
                                    <input
                                        type="date"
                                        value={
                                            selectedReferral.dateEmailed
                                                ? new Date(selectedReferral.dateEmailed)
                                                    .toISOString()
                                                    .slice(0, 10)
                                                : ""
                                        }
                                        readOnly
                                        className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date Called
                                    </label>
                                    <input
                                        type="date"
                                        value={
                                            selectedReferral.dateCalled
                                                ? new Date(selectedReferral.dateCalled)
                                                    .toISOString()
                                                    .slice(0, 10)
                                                : ""
                                        }
                                        readOnly
                                        className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dental Issue
                                </label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {dentalIssues.map((issue) => (
                                        <label
                                            key={issue}
                                            className={`flex items-center gap-2 ${selectedReferral.dentalIssue === issue
                                                ? "font-semibold"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                checked={selectedReferral.dentalIssue === issue}
                                                readOnly
                                                disabled
                                                className="w-4 h-4"
                                            />
                                            {issue}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type of Referral
                                </label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {referralTypes.map((type) => (
                                        <label
                                            key={type}
                                            className={`flex items-center gap-2 ${selectedReferral.typeOfReferral === type
                                                ? "font-semibold"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            <input type="radio" checked readOnly disabled className="w-4 h-4" />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes
                                </label>
                                <textarea
                                    value={selectedReferral.notes || ""}
                                    readOnly
                                    rows={3}
                                    className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Created By
                                </label>
                                <input
                                    type="text"
                                    value={selectedReferral.createdBy || ""}
                                    readOnly
                                    className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedReferral(null)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseManagement;
