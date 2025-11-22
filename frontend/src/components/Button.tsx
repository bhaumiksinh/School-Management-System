import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

    const getStyle = () => {
        switch (variant) {
            case 'primary': return { backgroundColor: 'var(--primary)', color: 'white' };
            case 'secondary': return { backgroundColor: 'var(--secondary)', color: 'white' };
            case 'danger': return { backgroundColor: 'var(--danger)', color: 'white' };
            case 'outline': return { border: '2px solid var(--border)', color: 'var(--text-muted)' };
            default: return {};
        }
    };

    return (
        <button
            className={`${baseStyles} ${className}`}
            style={getStyle()}
            {...props}
        >
            {children}
        </button>
    );
};
