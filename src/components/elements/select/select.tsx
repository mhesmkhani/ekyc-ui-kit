'use client';

import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';

import Text from '../text';
import type { SelectOption, SelectProps } from './select.props';

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
  const { options, value, onChange, placeholder = 'Select an option', label, error, disabled, size = 'md', colorScheme = 'primary', className, selectClassName, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const selectedOptionLabel = options.find((o) => o.value === value)?.label;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectOption = (option: SelectOption) => {
    if (disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  const sizeStyles = {
    sm: 'text-sm py-1.5',
    md: 'text-base py-2',
    lg: 'text-lg py-2.5',
  };

  const iconSizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const colorSchemeStyles = {
    primary: 'focus:border-primary-600 focus:ring-primary-600',
    secondary: 'focus:border-secondary-500 focus:ring-secondary-500',
    neutral: 'focus:border-neutral-500 focus:ring-neutral-500',
    gray: 'focus:border-gray-400 focus:ring-gray-300',
  };

  const selectStyles = clsx(
    'font-normal relative flex w-full items-center appearance-none rounded-md border shadow-sm transition-colors px-3',
    'focus:outline-none focus:ring-1',
    'disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500',
    error ? 'border-red-500 text-red-700 focus:border-red-600 focus:ring-red-600' : ['border-gray-300 text-dark-900', colorSchemeStyles[colorScheme]],
    sizeStyles[size],
    disabled ? 'cursor-not-allowed bg-neutral-100 opacity-75' : 'cursor-pointer bg-white',
    selectClassName,
  );

  const optionStyles = clsx('cursor-pointer select-none px-4 text-dark-800 hover:bg-secondary-100', sizeStyles[size]);

  return (
    <div className={clsx('flex flex-col', className)} {...rest}>
      {label && (
        <label htmlFor={id} className={clsx('mb-1 font-medium', 'self-end rtl:self-start', size === 'sm' ? 'text-xs' : 'text-sm', error ? 'text-red-600' : 'text-gray-500')}>
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <button
          type="button"
          ref={ref}
          id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={selectStyles}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="options-list"
        >
          <span className="flex-1 truncate text-right">
            {selectedOptionLabel ? <span className="text-dark-900">{selectedOptionLabel}</span> : <span className="text-neutral-300 text-sm">{placeholder}</span>}
          </span>

          <ChevronDown className={clsx('text-neutral-500 transition-transform duration-200', iconSizeStyles[size], isOpen && 'rotate-180', error && 'text-red-500')} />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5" role="listbox">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelectOption(option)}
                  className={clsx(optionStyles, isSelected && 'font-semibold bg-secondary-50 text-secondary-800')}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <Text as="p" size="sm" className="mt-1 text-red-600">
          {error}
        </Text>
      )}
    </div>
  );
});

export default Select;
