import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            {label && <label className="text-sm font-medium text-slate-600">{label}</label>}
            <input
                className={`w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${className}`}
                style={{ border: '1px solid var(--border)' }}
                {...props}
            />
        </div>
    );
};
