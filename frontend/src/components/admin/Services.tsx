import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import api from '../../lib/axios';

const ServicesAdmin = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchServices = async () => {
        try {
            const { data } = await api.get('/services');
            setServices(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                fetchServices();
            } catch (error) {
                console.error(error);
                alert("Failed to delete");
            }
        }
    };

    const handleEdit = (service: any) => {
        setFormData(service);
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setFormData({});
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach(key => form.append(key, formData[key]));
        if (imageFile) form.append('image', imageFile);

        try {
            if (formData.id) {
                await api.put(`/services/${formData.id}`, form);
            } else {
                await api.post('/services', form);
            }
            setIsFormOpen(false);
            fetchServices();
        } catch (error) {
            console.error(error);
            alert("Failed to save service");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Services Management</h2>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price / Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            {service.image_url ? (
                                                <img className="h-10 w-10 rounded-md object-cover" src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${service.image_url}`} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-md bg-neutral-200" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-neutral-900">{service.title}</div>
                                            <div className="text-xs text-neutral-500 truncate w-48">{service.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    ${service.price} <br/> {service.duration} mins
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-900">
                                        <Pencil className="w-5 h-5 inline" />
                                    </button>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 ml-4">
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
                        <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Service' : 'Add Service'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
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
                                    <label className="block text-sm font-medium text-gray-700">Duration (mins)</label>
                                    <input type="number" required value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" />
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

export default ServicesAdmin;
