import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingApt, setEditingApt] = useState<any>(null);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments');
            setAppointments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            try {
                await api.delete(`/appointments/${id}`);
                fetchAppointments();
            } catch (error) {
                console.error(error);
                alert("Failed to delete");
            }
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/appointments/${id}`, { status });
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Appointments List</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Client Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service/Package</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {appointments.map((apt) => (
                            <tr key={apt.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-neutral-900">{apt.customer_name}</div>
                                    <div className="text-sm text-neutral-500">{apt.customer_phone}</div>
                                    <div className="text-xs text-neutral-400">{apt.customer_email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    {apt.services?.title || apt.packages?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    {apt.appointment_date} <br/> {apt.appointment_time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={apt.status}
                                        onChange={(e) => handleUpdateStatus(apt.id, e.target.value)}
                                        className="text-sm border-neutral-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(apt.id)} className="text-red-600 hover:text-red-900 ml-4">
                                        <Trash2 className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
