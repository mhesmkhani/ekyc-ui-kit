import type { HTMLAttributes, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Trigger element. */
  children: ReactNode;
  /** Tooltip content. If empty/null, tooltip will not render. */
  content?: ReactNode;
  /** Tooltip position relative to trigger. */
  placement?: TooltipPlacement;
  /** Disable tooltip visibility. */
  disabled?: boolean;
  /** Extra classes for tooltip bubble. */
  contentClassName?: string;
}
