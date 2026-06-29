import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import api from '../../lib/axios';

const GalleryAdmin = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchImages = async () => {
        try {
            const { data } = await api.get('/gallery');
            setImages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                await api.delete(`/gallery/${id}`);
                fetchImages();
            } catch (error) {
                console.error(error);
                alert("Failed to delete");
            }
        }
    };

    const handleEdit = (img: any) => {
        setFormData(img);
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setFormData({ visibility: true });
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
                await api.put(`/gallery/${formData.id}`, form);
            } else {
                await api.post('/gallery', form);
            }
            setIsFormOpen(false);
            fetchImages();
        } catch (error) {
            console.error(error);
            alert("Failed to save image");
        }
    };

    const handleToggleVisibility = async (img: any) => {
        try {
            await api.put(`/gallery/${img.id}`, { visibility: !img.visibility });
            fetchImages();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Gallery Management</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Image
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="relative group rounded-lg overflow-hidden border border-neutral-200">
                        <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${img.image_url}`}
                            alt={img.caption}
                            className={`w-full h-40 object-cover ${!img.visibility ? 'opacity-50 grayscale' : ''}`}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center space-y-2">
                            <span className="text-white text-xs font-medium px-2 text-center">{img.caption || 'No caption'}</span>
                            <span className="text-gray-300 text-xs px-2">{img.category || 'No category'}</span>
                            <div className="flex space-x-3 mt-2">
                                <button onClick={() => handleToggleVisibility(img)} className="text-white hover:text-gray-300">
                                    {img.visibility ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 text-yellow-400" />}
                                </button>
                                <button onClick={() => handleEdit(img)} className="text-white hover:text-blue-400">
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDelete(img.id)} className="text-white hover:text-red-500">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Image Info' : 'Upload Image'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!formData.id && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image *</label>
                                    <input type="file" required accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" />
                                </div>
                            )}
                            {formData.id && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Replace Image (Optional)</label>
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Caption (Optional)</label>
                                <input type="text" value={formData.caption || ''} onChange={e => setFormData({...formData, caption: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category (e.g. Hair, Nails)</label>
                                <input type="text" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                            </div>
                            <div className="flex items-center">
                                <input id="visibility" type="checkbox" checked={formData.visibility} onChange={e => setFormData({...formData, visibility: e.target.checked})} className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" />
                                <label htmlFor="visibility" className="ml-2 block text-sm text-gray-900">
                                    Visible on website
                                </label>
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

export default GalleryAdmin;
