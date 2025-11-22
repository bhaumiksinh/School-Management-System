import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Save } from 'lucide-react';

export const SchoolDetails = () => {
    const { school, updateSchool } = useApp();
    const [formData, setFormData] = useState(school);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSchool(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">School Details</h1>

            <Card>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="School Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter school name"
                    />

                    <Input
                        label="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Enter school address"
                    />

                    <Input
                        label="Principal Name"
                        value={formData.principal}
                        onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                        placeholder="Enter principal's name"
                    />

                    <Input
                        label="Contact Number"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="Enter contact number"
                    />

                    <div className="flex items-center gap-4 mt-6">
                        <Button type="submit" className="flex items-center gap-2">
                            <Save size={18} />
                            Save Changes
                        </Button>

                        {saved && (
                            <span className="text-green-600 font-medium animate-fade-in">
                                Saved successfully!
                            </span>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
};
