'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { DividerProps } from './divider.props';

const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(props, ref) {
  const { children, position = 'start', colorScheme = 'neutral', className, ...rest } = props;

  const baseContainerStyles = 'flex w-full items-center';
  const lineBaseStyles = 'flex-grow border-t';
  const textBaseStyles = 'flex-shrink-0 text-sm';

  const colorSchemeStyles = {
    primary: {
      line: 'border-primary-200 border-2',
      text: 'text-primary-600 font-medium',
    },
    neutral: {
      line: 'border-neutral-300',
      text: 'text-neutral-500',
    },
    secondary: {
      line: 'border-secondary-500 border-2',
      text: 'text-secondary-500 font-bold',
    },
  };

  const positionStyles = {
    start: 'pe-4',
    center: 'px-4',
    end: 'ps-4',
  };

  const currentStyles = colorSchemeStyles[colorScheme];

  return (
    <div ref={ref} className={clsx(baseContainerStyles, className)} role="separator" {...rest}>
      {(position === 'center' || position === 'end') && <div className={clsx(lineBaseStyles, currentStyles.line)} />}

      <span className={clsx(textBaseStyles, positionStyles[position], currentStyles.text)}>{children}</span>

      {(position === 'start' || position === 'center') && <div className={clsx(lineBaseStyles, currentStyles.line)} />}
    </div>
  );
});

export default Divider;
