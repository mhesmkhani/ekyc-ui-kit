import type { HTMLAttributes, ReactNode } from 'react';

export type TextAs = 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** HTML element used to render the text. */
  as?: TextAs;
  /** Text content. */
  children?: ReactNode;
  /** Visual font size token. */
  size?: TextSize;
  /** Visual font weight token. */
  weight?: TextWeight;
  /** Extra Tailwind/CSS classes. */
  className?: string;
}
