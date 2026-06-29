import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';
import api from '../../lib/axios';

const TestimonialsAdmin = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({ rating: 5, status: 'active' });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchTestimonials = async () => {
        try {
            const { data } = await api.get('/testimonials');
            setTestimonials(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await api.delete(`/testimonials/${id}`);
                fetchTestimonials();
            } catch (error) {
                console.error(error);
                alert("Failed to delete");
            }
        }
    };

    const handleEdit = (test: any) => {
        setFormData(test);
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setFormData({ rating: 5, status: 'active' });
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
                await api.put(`/testimonials/${formData.id}`, form);
            } else {
                await api.post('/testimonials', form);
            }
            setIsFormOpen(false);
            fetchTestimonials();
        } catch (error) {
            console.error(error);
            alert("Failed to save testimonial");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Testimonials Management</h2>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Review</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {testimonials.map((test) => (
                            <tr key={test.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            {test.image_url ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${test.image_url}`} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-neutral-200" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-neutral-900">{test.customer_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-neutral-500 line-clamp-2 max-w-xs">{test.review}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 flex mt-3">
                                    {[...Array(test.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${test.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {test.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(test)} className="text-blue-600 hover:text-blue-900">
                                        <Pencil className="w-5 h-5 inline" />
                                    </button>
                                    <button onClick={() => handleDelete(test.id)} className="text-red-600 hover:text-red-900 ml-4">
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
                        <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                                <input type="text" required value={formData.customer_name || ''} onChange={e => setFormData({...formData, customer_name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Review</label>
                                <textarea required rows={4} value={formData.review || ''} onChange={e => setFormData({...formData, review: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                <input type="number" min="1" max="5" required value={formData.rating || ''} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black">
                                    <option value="active">Active</option>
                                    <option value="hidden">Hidden</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customer Image</label>
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

export default TestimonialsAdmin;
