
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { ClassChart } from '../components/ClassChart';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
    const { students, teachers, classes, school } = useApp();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Students', value: students.length, icon: GraduationCap, color: '#6366f1' },
        { label: 'Total Teachers', value: teachers.length, icon: Users, color: '#ec4899' },
        { label: 'Active Classes', value: classes.length, icon: BookOpen, color: '#10b981' },
        { label: 'Attendance', value: '98%', icon: TrendingUp, color: '#f59e0b' },
    ];

    const chartData = classes.map(cls => ({
        name: cls.name,
        students: students.filter(s => s.classId === cls.id).length
    }));

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Admin</h1>
                <p className="text-[var(--text-muted)]">Here's what's happening at {school.name} today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="flex items-center gap-4">
                            <div
                                className="p-3 rounded-full text-white shadow-lg"
                                style={{ backgroundColor: stat.color }}
                            >
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)] font-medium">{stat.label}</p>
                                <h4 className="text-2xl font-bold">{stat.value}</h4>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                <Card title="Students per Class" className="lg:col-span-2">
                    {chartData.length > 0 ? (
                        <ClassChart data={chartData} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-[var(--text-muted)]">
                            No class data available
                        </div>
                    )}
                </Card>

                <Card title="Recent Activity">
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 pb-3 border-b border-[var(--border)] last:border-0">
                                <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                                <p className="text-sm">New student registration received</p>
                                <span className="text-xs text-[var(--text-muted)] ml-auto">2h ago</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Quick Actions">
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/students')}
                            className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors text-left"
                        >
                            Add Student
                        </button>
                        <button
                            onClick={() => navigate('/teachers')}
                            className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors text-left"
                        >
                            Add Teacher
                        </button>
                        <button
                            onClick={() => navigate('/classes')}
                            className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors text-left"
                        >
                            Create Class
                        </button>
                        <button
                            onClick={() => navigate('/school')}
                            className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors text-left"
                        >
                            School Settings
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
