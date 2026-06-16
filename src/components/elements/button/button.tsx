'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { ButtonProps } from './button.props';

const Spinner = ({ size = 'md' }: { size?: 'xs' | 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    xs: 'h-2 w-2',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <svg className={clsx('animate-spin', sizeClasses[size])} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { disabled, children, variant = 'solid', colorScheme = 'primary', size = 'md', className, startIcon, endIcon, isLoading, loadingText, ...rest } = props;

  const isDisabled = isLoading || disabled;

  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border';

  const colorStyles = {
    solid: {
      primary: 'border-transparent bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
      secondary: 'border-transparent bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-400',
      danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    },
    outline: {
      primary: 'border-primary-600 bg-transparent text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-primary-500',
      secondary: 'border-secondary-500 bg-transparent text-secondary-500 hover:bg-secondary-500 hover:text-white focus-visible:ring-secondary-400',
      danger: 'border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white focus-visible:ring-red-500',
    },
    text: {
      primary: 'border-transparent bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
      secondary: 'border-transparent bg-transparent text-secondary-600 hover:bg-secondary-50 focus-visible:ring-secondary-400',
      danger: 'border-transparent bg-transparent text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
    },
  };

  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSizeStyles = {
    xs: 'h-2 w-2',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const variantClass = colorStyles[variant][colorScheme];

  return (
    <button disabled={isDisabled} ref={ref} className={clsx(baseStyles, variantClass, sizeStyles[size], isLoading && 'cursor-wait', className)} {...rest}>
      {isLoading ? (
        <>
          <Spinner size={size} />
          {loadingText && <span className="px-2">{loadingText}</span>}
        </>
      ) : (
        <>
          {startIcon && <span className={clsx('mx-2', iconSizeStyles[size])}>{startIcon}</span>}
          {children}
          {endIcon && <span className={clsx('mx-2', iconSizeStyles[size])}>{endIcon}</span>}
        </>
      )}
    </button>
  );
});

export default Button;
