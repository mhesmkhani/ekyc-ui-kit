import { HTMLAttributes } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectColorScheme = 'primary' | 'secondary' | 'neutral' | 'gray';

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: SelectSize;
  colorScheme?: SelectColorScheme;
  selectClassName?: string;
}
