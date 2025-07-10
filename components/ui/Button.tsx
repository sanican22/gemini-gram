
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full bg-accent text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
