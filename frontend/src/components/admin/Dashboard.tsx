import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import api from '../../lib/axios';

const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [recent, setRecent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard/stats');
                setStats(data.stats);
                setRecent(data.recentAppointments);
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

    const statCards = [
        { name: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: "Today's Bookings", value: stats?.todaysBookings || 0, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { name: 'Upcoming', value: stats?.upcomingBookings || 0, icon: Calendar, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: 'Completed', value: stats?.completedServices || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Cancelled', value: stats?.cancelledBookings || 0, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { name: 'Revenue', value: stats?.revenuePlaceholder || '$0.00', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-xl border border-neutral-100">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.bg}`}>
                                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-neutral-500 truncate">{item.name}</dt>
                                        <dd className="text-2xl font-semibold text-neutral-900">{item.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Appointments */}
            <div className="bg-white shadow-sm rounded-xl border border-neutral-100">
                <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
                    <h3 className="text-lg leading-6 font-medium text-neutral-900">Recent Appointments</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service/Package</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date & Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                            {recent.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-neutral-500">No recent appointments found.</td></tr>
                            ) : (
                                recent.map((apt) => (
                                    <tr key={apt.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-neutral-900">{apt.customer_name}</div>
                                            <div className="text-sm text-neutral-500">{apt.customer_phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                            {apt.services?.title || apt.packages?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                            {apt.appointment_date} <br/> {apt.appointment_time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                  apt.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                  apt.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
