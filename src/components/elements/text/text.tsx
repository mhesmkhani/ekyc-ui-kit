'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { TextProps, TextSize, TextWeight } from './text.props';

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const weightStyles: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  const { as: Component = 'p', children, className, size = 'md', weight = 'normal', ...rest } = props;

  return (
    <Component ref={ref as any} className={clsx('text-dark-800', sizeStyles[size], weightStyles[weight], className)} {...rest}>
      {children}
    </Component>
  );
});

export default Text;
