import { clsx } from 'clsx';
import React from 'react';

import type { RadioOptionProps } from './radio-option.props';

const RadioOption: React.FC<RadioOptionProps> = ({ id, name, value, label, checked = false, onChange, disabled = false, size = 'medium', className, labelClassName, dir = 'rtl' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e.target.value);
    }
  };

  const sizeClasses = {
    small: {
      radio: 'w-4 h-4',
      label: 'text-sm',
      gap: 'gap-2',
      dot: 'w-2 h-2',
    },
    medium: {
      radio: 'w-5 h-5',
      label: 'text-base',
      gap: 'gap-3',
      dot: 'w-2.5 h-2.5',
    },
    large: {
      radio: 'w-6 h-6',
      label: 'text-lg',
      gap: 'gap-4',
      dot: 'w-3 h-3',
    },
  };

  const radioClasses = clsx(
    // Base styles
    'appearance-none border-2 rounded-full transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
    'flex-shrink-0',

    // Size
    sizeClasses[size].radio,

    // States
    {
      'border-gray-300 bg-white hover:border-primary-400': !checked && !disabled,
      'border-primary-500 bg-white hover:border-primary-600': checked && !disabled,
      'border-gray-200 bg-gray-100 cursor-not-allowed': disabled,
      'border-primary-300 bg-gray-100': checked && disabled,
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
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={handleChange} disabled={disabled} className={radioClasses} />

        {/* Radio dot */}
        {checked && (
          <div
            className={clsx('absolute rounded-full bg-primary-500 pointer-events-none', sizeClasses[size].dot, {
              'bg-primary-300': disabled,
            })}
          />
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

export default RadioOption;
