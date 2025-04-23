import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm 
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-70
          dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}