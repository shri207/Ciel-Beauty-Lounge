import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import api from '../../lib/axios';

const PackagesAdmin = () => {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const fetchPackages = async () => {
        try {
            const { data } = await api.get('/packages');
            setPackages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this package?')) {
            try {
                await api.delete(`/packages/${id}`);
                fetchPackages();
            } catch (error) {
                console.error(error);
                alert("Failed to delete");
            }
        }
    };

    const handleEdit = (pkg: any) => {
        setFormData(pkg);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setFormData({});
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/packages/${formData.id}`, formData);
            } else {
                await api.post('/packages', formData);
            }
            setIsFormOpen(false);
            fetchPackages();
        } catch (error) {
            console.error(error);
            alert("Failed to save package");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Packages Management</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Package Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price / Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-neutral-900">{pkg.name}</div>
                                    <div className="text-xs text-neutral-500 truncate w-48">{pkg.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    ${pkg.price} <br/> <span className="text-green-600">-${pkg.discount || 0}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {pkg.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(pkg)} className="text-blue-600 hover:text-blue-900">
                                        <Pencil className="w-5 h-5 inline" />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:text-red-900 ml-4">
                                        <Trash2 className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Package' : 'Add Package'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input type="number" step="0.01" required value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Discount ($)</label>
                                    <input type="number" step="0.01" value={formData.discount || ''} onChange={e => setFormData({...formData, discount: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-800">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackagesAdmin;
