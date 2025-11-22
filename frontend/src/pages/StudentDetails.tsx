import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Plus, GraduationCap } from 'lucide-react';

export const StudentDetails = () => {
    const { students, addStudent, classes } = useApp();
    const [newStudent, setNewStudent] = useState({ name: '', classId: '', age: '', guardian: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.classId) return;

        addStudent({
            id: Date.now().toString(),
            name: newStudent.name,
            classId: newStudent.classId,
            age: parseInt(newStudent.age) || 0,
            guardian: newStudent.guardian
        });
        setNewStudent({ name: '', classId: '', age: '', guardian: '' });
    };

    const getClassName = (id: string) => {
        return classes.find(c => c.id === id)?.name || 'Unassigned';
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Students</h1>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {students.length}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="lg:col-span-1">
                    <Card title="Register Student">
                        <form onSubmit={handleAdd}>
                            <Input
                                label="Full Name"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                placeholder="e.g. Jane Doe"
                            />

                            <div className="flex flex-col gap-2 mb-4">
                                <label className="text-sm font-medium text-slate-600">Class</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    style={{ border: '1px solid var(--border)' }}
                                    value={newStudent.classId}
                                    onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Age"
                                type="number"
                                value={newStudent.age}
                                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                                placeholder="e.g. 15"
                            />

                            <Input
                                label="Guardian Name"
                                value={newStudent.guardian}
                                onChange={(e) => setNewStudent({ ...newStudent, guardian: e.target.value })}
                                placeholder="Parent/Guardian Name"
                            />

                            <Button type="submit" className="w-full flex justify-center items-center gap-2">
                                <Plus size={18} />
                                Register Student
                            </Button>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="p-4 font-semibold text-[var(--text-muted)]">Name</th>
                                        <th className="p-4 font-semibold text-[var(--text-muted)]">Class</th>
                                        <th className="p-4 font-semibold text-[var(--text-muted)]">Age</th>
                                        <th className="p-4 font-semibold text-[var(--text-muted)]">Guardian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">
                                                No students registered yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student) => (
                                            <tr key={student.id} className="border-b border-[var(--border)] last:border-0 hover:bg-slate-50">
                                                <td className="p-4 font-medium flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                                                        <GraduationCap size={16} />
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                                                        {getClassName(student.classId)}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-[var(--text-muted)]">{student.age}</td>
                                                <td className="p-4 text-[var(--text-muted)]">{student.guardian}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
