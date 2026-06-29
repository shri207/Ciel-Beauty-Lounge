import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';

const SettingsAdmin = () => {
    const [settings, setSettings] = useState<any>({
        general: { salonName: '', address: '', phone: '', email: '' },
        social: { instagram: '', facebook: '' },
        booking_rules: { advanceBookingDays: 30, cancellationNoticeHours: 24 }
    });
    const [hours, setHours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const [settingsRes, hoursRes] = await Promise.all([
                    api.get('/settings'),
                    api.get('/working-hours')
                ]);
                if (settingsRes.data.general) setSettings(settingsRes.data);

                // Ensure all 7 days exist
                let fetchedHours = hoursRes.data || [];
                const fullWeek = [0,1,2,3,4,5,6].map(day => {
                    const existing = fetchedHours.find((h:any) => h.day_of_week === day);
                    return existing || { day_of_week: day, is_open: false, opening_time: '09:00:00', closing_time: '17:00:00' };
                });
                setHours(fullWeek);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSettingsChange = (category: string, field: string, value: string | number) => {
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                [field]: value
            }
        });
    };

    const handleHoursChange = (dayIndex: number, field: string, value: any) => {
        const newHours = [...hours];
        newHours[dayIndex] = { ...newHours[dayIndex], [field]: value };
        setHours(newHours);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                api.put('/settings', { settings }),
                api.put('/working-hours', { hours })
            ]);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-neutral-900">Business Settings</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salon Name</label>
                        <input type="text" value={settings.general.salonName} onChange={e => handleSettingsChange('general', 'salonName', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={settings.general.email} onChange={e => handleSettingsChange('general', 'email', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" value={settings.general.phone} onChange={e => handleSettingsChange('general', 'phone', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" value={settings.general.address} onChange={e => handleSettingsChange('general', 'address', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                        <input type="url" value={settings.social.instagram} onChange={e => handleSettingsChange('social', 'instagram', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                        <input type="url" value={settings.social.facebook} onChange={e => handleSettingsChange('social', 'facebook', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black" />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-neutral-100 p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Working Hours</h3>
                <div className="space-y-4">
                    {hours.map((day, index) => (
                        <div key={day.day_of_week} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                            <div className="w-24 font-medium">{daysMap[day.day_of_week]}</div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={day.is_open}
                                    onChange={e => handleHoursChange(index, 'is_open', e.target.checked)}
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Open</span>
                            </div>

                            {day.is_open && (
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="time"
                                        value={day.opening_time ? day.opening_time.substring(0,5) : ''}
                                        onChange={e => handleHoursChange(index, 'opening_time', e.target.value + ':00')}
                                        className="border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                    <span>to</span>
                                    <input
                                        type="time"
                                        value={day.closing_time ? day.closing_time.substring(0,5) : ''}
                                        onChange={e => handleHoursChange(index, 'closing_time', e.target.value + ':00')}
                                        className="border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsAdmin;
