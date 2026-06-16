export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertOption {
  key?: string;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  dismissOnClick?: boolean;
}

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message?: string;
  messages?: string[];
  ordered?: boolean;
  size?: AlertSize;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  options?: AlertOption[];
  onOptionClick?: (option: AlertOption) => void;
}
