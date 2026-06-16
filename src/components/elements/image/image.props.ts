import { CSSProperties, ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
  dataTestId?: string;
  onError?: () => void;
  onLoad?: () => void;
}
