import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required = false,
  placeholder = '',
  options = [],
  as = 'input',
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-gray-700 font-medium mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {as === 'textarea' ? (
        <textarea
          id={id}
          value={value as string}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors"
          required={required}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          value={value as string}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors"
          required={required}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={id}
            checked={value as boolean}
            onChange={onChange}
            className="h-4 w-4 text-gold focus:ring-gold/50 border-gray-300 rounded"
          />
          <label htmlFor={id} className="ml-2 block text-sm text-gray-600">
            {placeholder}
          </label>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors"
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;