import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditReferral from './EditReferral';

const ReferralTable = ({ refreshFlag, studentId }) => {
    const [referrals, setReferrals] = useState([]);
    const [editingReferral, setEditingReferral] = useState(null);

    useEffect(() => {
        if (studentId) {
            fetchReferrals();
        } else {
            setReferrals([]);
        }
    }, [refreshFlag, studentId]);

    const fetchReferrals = async () => {
        try {
            const res = await api.get('/referrals', {
                params: studentId ? { studentId } : {},
            });
            setReferrals(
                res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (updatedReferral) => {
        setReferrals((prev) =>
            prev.map((r) => (r._id === updatedReferral._id ? updatedReferral : r))
        );
        setEditingReferral(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this communication?')) return;
        try {
            await api.delete(`/referrals/${id}`);
            setReferrals((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete referral');
        }
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Referral History</h2>
            <div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date Emailed</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Notes</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created By</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {referrals.map((r) => (
                            <tr key={r._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {r.dateEmailed ? new Date(r.dateEmailed).toLocaleDateString() : ''}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">{r.notes}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{r.createdBy}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => setEditingReferral(r)}
                                        className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(r._id)}
                                        className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {referrals.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                    No referrals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editingReferral && (
                <EditReferral
                    referral={editingReferral}
                    onClose={() => setEditingReferral(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ReferralTable;
