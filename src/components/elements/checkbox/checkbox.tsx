import { clsx } from 'clsx';
import React from 'react';

import type { CheckboxProps } from './checkbox.props';

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked = false, onChange, disabled = false, size = 'medium', className, labelClassName, dir = 'rtl' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e.target.checked);
    }
  };

  const sizeClasses = {
    small: {
      checkbox: 'w-4 h-4',
      label: 'text-sm',
      gap: 'gap-2',
    },
    medium: {
      checkbox: 'w-5 h-5',
      label: 'text-base',
      gap: 'gap-3',
    },
    large: {
      checkbox: 'w-6 h-6',
      label: 'text-lg',
      gap: 'gap-4',
    },
  };

  const checkboxClasses = clsx(
    // Base styles
    'appearance-none border-2 rounded transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
    'flex-shrink-0',

    // Size
    sizeClasses[size].checkbox,

    // States
    {
      'border-gray-300 bg-white hover:border-primary-400': !checked && !disabled,
      'border-primary-500 bg-primary-500 hover:bg-primary-600': checked && !disabled,
      'border-gray-200 bg-gray-100 cursor-not-allowed': disabled,
      'border-gray-300 bg-gray-300': checked && disabled,
    },

    // Custom className
    className,
  );

  const labelClasses = clsx(
    'select-none cursor-pointer transition-colors duration-200',
    'leading-none',
    sizeClasses[size].label,
    {
      'text-dark-900 hover:text-dark-700': !disabled,
      'text-gray-400 cursor-not-allowed': disabled,
    },
    labelClassName,
  );

  const containerClasses = clsx('inline-flex items-center', sizeClasses[size].gap, {
    'flex-row-reverse': dir === 'rtl',
    'flex-row': dir === 'ltr',
  });

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        <input type="checkbox" id={id} checked={checked} onChange={handleChange} disabled={disabled} className={checkboxClasses} />

        {/* Checkmark icon */}
        {checked && (
          <svg className={clsx('absolute pointer-events-none text-white', sizeClasses[size].checkbox)} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
