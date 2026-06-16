'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useId } from 'react';

import Text from '../text';
import type { InputProps } from './input.props';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { label, error, startIcon, endIcon, inputSize = 'md', colorScheme = 'primary', className, inputClassName, ...rest } = props;

  const id = useId();

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

  const iconPaddingStyles = {
    sm: { ps: 'ps-8', pe: 'pe-8', px: 'px-2.5' },
    md: { ps: 'ps-10', pe: 'pe-10', px: 'px-3' },
    lg: { ps: 'ps-12', pe: 'pe-12', px: 'px-4' },
  };

  const iconContainerPadding = {
    sm: { ps: 'ps-2.5', pe: 'pe-2.5' },
    md: { ps: 'ps-3', pe: 'pe-3' },
    lg: { ps: 'ps-4', pe: 'pe-4' },
  };

  const colorSchemeStyles = {
    primary: 'focus:border-primary-600 focus:ring-primary-600',
    secondary: 'focus:border-secondary-500 focus:ring-secondary-500',
    neutral: 'focus:border-neutral-500 focus:ring-neutral-500',
    gray: 'focus:border-gray-400 focus:ring-gray-300',
  };

  const inputPadding = clsx({
    [iconPaddingStyles[inputSize].px]: !startIcon && !endIcon,
    [`${iconPaddingStyles[inputSize].ps} pe-3`]: startIcon && !endIcon,
    [`${iconPaddingStyles[inputSize].pe} ps-3`]: endIcon && !startIcon,
    [`${iconPaddingStyles[inputSize].ps} ${iconPaddingStyles[inputSize].pe}`]: startIcon && endIcon,
  });

  const inputStyles = clsx(
    'font-normal relative block w-full appearance-none rounded-md border shadow-sm transition-colors',
    'placeholder:text-neutral-300 placeholder:text-sm',
    'focus:outline-none focus:ring-1',
    'disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500',
    error ? 'border-red-500 text-red-700 focus:border-red-600 focus:ring-red-600' : ['border-gray-300 text-dark-900', colorSchemeStyles[colorScheme]],
    sizeStyles[inputSize],
    inputPadding,
    inputClassName,
  );

  return (
    <div className={clsx('flex flex-col', className)}>
      {' '}
      {label && (
        <label htmlFor={id} className={clsx('mb-1 font-medium', 'self-end rtl:self-start', inputSize === 'sm' ? 'text-xs' : 'text-sm', error ? 'text-red-600' : 'text-gray-500')}>
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className={clsx('pointer-events-none absolute inset-y-0 right-0 flex items-center z-10', iconContainerPadding[inputSize].ps)}>
            <span className={clsx(iconSizeStyles[inputSize], error ? 'text-red-500' : 'text-neutral-400')}>{startIcon}</span>
          </div>
        )}

        <input ref={ref} id={id} className={inputStyles} {...rest} />

        {endIcon && (
          <div className={clsx('absolute inset-y-0 left-0 flex items-center z-10', iconContainerPadding[inputSize].pe)}>
            <span className={clsx(iconSizeStyles[inputSize])}>{endIcon}</span>
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

export default Input;
