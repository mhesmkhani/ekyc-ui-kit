'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useState } from 'react';

import type { ImageProps } from './image.props';

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  const { src, alt, fallbackSrc, objectFit = 'cover', rounded = 'none', size = 'full', loading = 'lazy', className, style, dataTestId, onError, onLoad, ...rest } = props;

  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const objectFitStyles = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    xxl: 'w-64 h-64',
    full: 'w-full h-full',
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }

    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const imageStyles = clsx(
    'transition-opacity duration-300',
    objectFitStyles[objectFit],
    roundedStyles[rounded],
    sizeStyles[size],
    isLoading && 'opacity-0',
    !isLoading && !hasError && 'opacity-100',
    hasError && 'opacity-50',
    className,
  );

  if (hasError && !fallbackSrc) {
    return (
      <div data-testid={dataTestId} style={style} className={clsx('flex items-center justify-center bg-gray-200 text-gray-400', roundedStyles[rounded], sizeStyles[size], className)}>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div className={'relative inline-block'} style={style}>
      {isLoading && (
        <div className={clsx('absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse', roundedStyles[rounded], sizeStyles[size])}>
          <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <img ref={ref} src={currentSrc} alt={alt} loading={loading} data-testid={dataTestId} className={imageStyles} onError={handleError} onLoad={handleLoad} {...rest} />
    </div>
  );
});

export default Image;
