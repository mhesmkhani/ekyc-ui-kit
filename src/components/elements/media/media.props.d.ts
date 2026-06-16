import { ReactNode } from 'react';

export interface MediaProps {
  children?: ReactNode;

  className?: string;

  style?: any;

  at?: 'xs' | 'sm' | 'md' | 'lg';

  lessThan?: 'md' | 'lg';

  greaterThan?: 'xs' | 'sm';

  between?: 'xs-lg';
}
