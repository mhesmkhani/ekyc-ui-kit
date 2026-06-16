'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useId, useState } from 'react';

import type { TooltipPlacement, TooltipProps } from './tooltip.props';

const bubblePlacementStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const arrowPlacementStyles: Record<TooltipPlacement, string> = {
  top: 'left-1/2 top-full -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-dark-800',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-x-4 border-b-4 border-x-transparent border-b-dark-800',
  left: 'left-full top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-dark-800',
  right: 'right-full top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-dark-800',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(props, ref) {
  const { children, content, className, contentClassName, placement = 'top', disabled = false, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const shouldShowTooltip = isVisible && !disabled && content !== null && content !== undefined && content !== '';

  return (
    <div
      ref={ref}
      className={clsx('relative inline-flex items-center', className)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      aria-describedby={shouldShowTooltip ? tooltipId : undefined}
      {...rest}
    >
      {children}

      {shouldShowTooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          className={clsx(
            'pointer-events-none absolute z-50 w-max max-w-64 rounded-lg bg-dark-800 px-3 py-2 text-sm leading-6 text-white shadow-lg',
            bubblePlacementStyles[placement],
            contentClassName,
          )}
        >
          {content}
          <span className={clsx('absolute h-0 w-0', arrowPlacementStyles[placement])} />
        </div>
      )}
    </div>
  );
});

export default Tooltip;
