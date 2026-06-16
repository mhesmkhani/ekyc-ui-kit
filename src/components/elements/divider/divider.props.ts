import { HTMLAttributes, ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position?: 'start' | 'center' | 'end';
  colorScheme?: 'primary' | 'neutral' | 'secondary';
}
