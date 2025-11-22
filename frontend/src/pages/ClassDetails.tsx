import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Plus, BookOpen } from 'lucide-react';

export const ClassDetails = () => {
    const { classes, addClass, teachers } = useApp();
    const [newClass, setNewClass] = useState({ name: '', teacherId: '', room: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClass.name) return;

        addClass({
            id: Date.now().toString(),
            ...newClass
        });
        setNewClass({ name: '', teacherId: '', room: '' });
    };

    const getTeacherName = (id: string) => {
        return teachers.find(t => t.id === id)?.name || 'Unassigned';
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Classes</h1>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {classes.length}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="lg:col-span-1">
                    <Card title="Create New Class">
                        <form onSubmit={handleAdd}>
                            <Input
                                label="Class Name"
                                value={newClass.name}
                                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                placeholder="e.g. Grade 10-A"
                            />

                            <div className="flex flex-col gap-2 mb-4">
                                <label className="text-sm font-medium text-slate-600">Class Teacher</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    style={{ border: '1px solid var(--border)' }}
                                    value={newClass.teacherId}
                                    onChange={(e) => setNewClass({ ...newClass, teacherId: e.target.value })}
                                >
                                    <option value="">Select Teacher</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Room Number"
                                value={newClass.room}
                                onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                                placeholder="e.g. Room 101"
                            />

                            <Button type="submit" className="w-full flex justify-center items-center gap-2">
                                <Plus size={18} />
                                Create Class
                            </Button>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {classes.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-[var(--text-muted)] bg-white rounded-xl border border-dashed border-slate-300">
                            <p>No classes created yet.</p>
                        </div>
                    ) : (
                        classes.map((cls) => (
                            <Card key={cls.id} className="hover:border-indigo-300 cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <BookOpen size={24} />
                                    </div>
                                    <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">
                                        {cls.room}
                                    </span>
                                </div>
                                <h4 className="font-bold text-lg mb-1">{cls.name}</h4>
                                <p className="text-sm text-[var(--text-muted)]">
                                    Teacher: <span className="text-[var(--text-main)] font-medium">{getTeacherName(cls.teacherId)}</span>
                                </p>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
