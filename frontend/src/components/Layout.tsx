
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, School, Users, GraduationCap, BookOpen, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useApp();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/school', label: 'School Details', icon: School },
        { path: '/teachers', label: 'Teachers', icon: Users },
        { path: '/classes', label: 'Classes', icon: BookOpen },
        { path: '/students', label: 'Students', icon: GraduationCap },
    ];

    return (
        <div className="flex h-screen bg-[var(--background)]">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col">
                <div className="p-6 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="School Manager" className="w-8 h-8 object-contain" />
                        <h1 className="text-xl font-bold text-[var(--primary)]">School Manager</h1>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-[var(--primary)] text-white shadow-md'
                                    : 'text-[var(--text-muted)] hover:bg-slate-50 hover:text-[var(--primary)]'
                                    }`}
                                style={isActive ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-[var(--text-muted)]">admin@school.com</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
