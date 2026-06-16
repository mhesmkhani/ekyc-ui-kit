import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonColorScheme = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'text';
  colorScheme?: ButtonColorScheme;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
}
