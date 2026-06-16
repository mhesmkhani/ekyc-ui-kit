import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Divider from '../divider';
import type { ModalProps } from './modal.props';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  titleWithDivider = false,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOverlayClick = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={handleOverlayClick}
          dir="rtl"
        >
          {/* Overlay Background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className={`
              relative w-full ${sizeClasses[size]} 
              bg-white
              rounded-xl shadow-2xl 
              ${className}
            `}
            onClick={handleModalClick}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <motion.div className="flex items-center justify-between p-5 border-b border-gray-200" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                {title &&
                  (titleWithDivider ? (
                    <Divider colorScheme="secondary" position="start">
                      {title}
                    </Divider>
                  ) : (
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                  ))}
                {showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="mr-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                    aria-label="بستن"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Body */}
            <motion.div className="max-h-[70vh] overflow-y-auto text-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              {children}
            </motion.div>

            {/* Footer */}
            {footer && (
              <motion.div className="flex items-center justify-start gap-3 p-5 border-t border-gray-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {footer}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
