import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';


export const Login = () => {
    const { login } = useApp();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (username && password) {
            login();
            navigate('/');
        } else {
            setError('Please enter both username and password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-indigo-50">
            <Card className="w-full max-w-md p-8 animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-6">
                        <img src="/logo.png" alt="School Manager" className="w-20 h-20 object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
                    <p className="text-[var(--text-muted)] text-center">Sign in to School Manager</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button type="submit" className="w-full justify-center">
                        Sign In
                    </Button>
                </form>
            </Card>
        </div>
    );
};
