import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'secondary' | 'neutral' | 'gray';
  inputClassName?: string;
}
