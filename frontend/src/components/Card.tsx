import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({ children, className = '', title }: CardProps) => {
    return (
        <div className={`card p-6 ${className}`}>
            {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
            {children}
        </div>
    );
};
