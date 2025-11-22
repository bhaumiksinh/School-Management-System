import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Plus, Trash2 } from 'lucide-react';

export const TeacherDetails = () => {
    const { teachers, addTeacher } = useApp();
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', email: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTeacher.name || !newTeacher.subject) return;

        addTeacher({
            id: Date.now().toString(),
            ...newTeacher
        });
        setNewTeacher({ name: '', subject: '', email: '' });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Teachers</h1>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {teachers.length}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Add Teacher Form */}
                <div className="lg:col-span-1">
                    <Card title="Add New Teacher">
                        <form onSubmit={handleAdd}>
                            <Input
                                label="Full Name"
                                value={newTeacher.name}
                                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                placeholder="e.g. John Doe"
                            />
                            <Input
                                label="Subject"
                                value={newTeacher.subject}
                                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                                placeholder="e.g. Mathematics"
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={newTeacher.email}
                                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                placeholder="e.g. john@school.com"
                            />
                            <Button type="submit" className="w-full flex justify-center items-center gap-2">
                                <Plus size={18} />
                                Add Teacher
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Teachers List */}
                <div className="lg:col-span-2 space-y-4">
                    {teachers.length === 0 ? (
                        <div className="text-center py-12 text-[var(--text-muted)] bg-white rounded-xl border border-dashed border-slate-300">
                            <p>No teachers added yet.</p>
                        </div>
                    ) : (
                        teachers.map((teacher) => (
                            <Card key={teacher.id} className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-lg">{teacher.name}</h4>
                                    <p className="text-sm text-[var(--text-muted)]">{teacher.subject}</p>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">{teacher.email}</p>
                                </div>
                                <Button variant="outline" className="p-2 text-red-500 hover:text-red-600 hover:border-red-200">
                                    <Trash2 size={18} />
                                </Button>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
