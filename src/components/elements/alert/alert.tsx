import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

import type { AlertOption, AlertProps, AlertSize, AlertVariant } from './alert.props';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, title, message, messages, size = 'md', dismissible = false, onDismiss, className = '', icon, showIcon = true, options, onOptionClick, ordered = false }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    const handleOptionClick = (option: AlertOption) => {
      if (option.dismissOnClick) {
        setIsVisible(false);
      }
      onOptionClick?.(option);
      option.onClick?.();
    };

    if (!isVisible) return null;

    const getVariantStyles = (variant: AlertVariant): string => {
      const styles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-secondary-50 border-secondary-200 text-gray-800',
      };
      return styles[variant];
    };

    const getSizeStyles = (size: AlertSize): string => {
      const styles = {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      };
      return styles[size];
    };

    const getDefaultIcon = (variant: AlertVariant): React.ReactNode => {
      const iconSize = size === 'sm' ? 18 : size === 'lg' ? 24 : 20;

      switch (variant) {
        case 'success':
          return <CheckCircle size={iconSize} />;
        case 'error':
          return <XCircle size={iconSize} />;
        case 'warning':
          return <AlertTriangle size={iconSize} />;
        case 'info':
          return <Info size={iconSize} />;
        default:
          return null;
      }
    };

    const getButtonVariantStyles = (variant: AlertVariant): string => {
      const styles = {
        success: 'bg-green-600 hover:bg-green-700 text-white',
        error: 'bg-red-600 hover:bg-red-700 text-white',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        info: 'bg-secondary-600 hover:bg-secondary-700 text-white',
      };
      return styles[variant];
    };

    const renderMessages = () => {
      // If single message string
      if (message && !messages) {
        return <p className={title ? 'text-sm opacity-90' : ''}>{message}</p>;
      }

      // If multiple messages array
      if (messages && messages.length > 0) {
        if (ordered) {
          return (
            <ol className={`${title ? 'text-sm opacity-90' : ''} list-decimal list-inside space-y-1`}>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ol>
          );
        } else {
          return (
            <ul className={`${title ? 'text-sm opacity-90' : ''} list-disc list-inside py-2`}>
              {messages.map((msg, index) => (
                <li className={'py-1'} key={index}>
                  {msg}
                </li>
              ))}
            </ul>
          );
        }
      }

      return null;
    };

    const baseStyles = 'border rounded-lg flex flex-col space-y-3 relative';
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}>
        <div className="flex items-start gap-3">
          {showIcon && <div className="flex-shrink-0 py-1">{icon || getDefaultIcon(variant)}</div>}

          <div className="flex-1 min-w-0 py-1">
            {title && <h3 className="font-medium">{title}</h3>}
            {renderMessages()}
          </div>

          {dismissible && (
            <button onClick={handleDismiss} className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Dismiss alert">
              <X size={16} />
            </button>
          )}
        </div>

        {options && options.length > 0 && (
          <div className="flex gap-2">
            {options.map((option, index) => (
              <button
                key={option.key || index}
                onClick={() => handleOptionClick(option)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${option.variant === 'primary' ? getButtonVariantStyles(variant) : 'bg-white border border-current hover:bg-gray-50'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

export default Alert;
