import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Scissors, Package, Image as ImageIcon, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
        { name: 'Services', href: '/admin/services', icon: Scissors },
        { name: 'Packages', href: '/admin/packages', icon: Package },
        { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-neutral-100 overflow-hidden font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-neutral-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-black">
                    <span className="text-xl font-medium tracking-wide">Ciel Admin</span>
                    <button className="lg:hidden text-neutral-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-neutral-800 text-white'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 z-10">
                    <div className="flex items-center">
                        <button
                            className="text-neutral-500 hover:text-neutral-900 focus:outline-none lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="ml-4 text-xl font-semibold text-neutral-800 capitalize hidden sm:block">
                            {location.pathname.split('/').pop() || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <Link to="/" target="_blank" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 mr-6">
                            View Site
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
