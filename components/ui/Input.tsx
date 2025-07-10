
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full bg-surface-2 border border-surface-2 rounded-md px-3 py-2 text-sm text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-accent transition-all ${className}`}
      {...props}
    />
  );
};

export default Input;
