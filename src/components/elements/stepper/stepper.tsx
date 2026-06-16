import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import React from 'react';

import type { StepperProps } from './stepper.props';

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(function Stepper(props, ref) {
  const { steps, currentStep, onStepClick, className, ...rest } = props;

  return (
    <div ref={ref} className={clsx('flex w-full items-start justify-between flex-wrap sm:flex-nowrap', className)} {...rest}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isCurrent = index === currentStep - 1;
        const isUpcoming = index > currentStep - 1;
        const isFirstStep = index === 0;
        const isLastStep = index === steps.length - 1;

        return (
          <div key={step.id} className="relative flex flex-1 flex-col items-center min-w-[70px] sm:min-w-0">
            <div className="absolute top-5 h-0.5 w-full">
              {!isFirstStep && <div className={clsx('absolute end-1/2 h-full w-1/2', index < currentStep ? 'bg-secondary-500' : 'bg-neutral-300')} />}
              {!isLastStep && <div className={clsx('absolute start-1/2 h-full w-1/2', isCompleted ? 'bg-secondary-500' : 'bg-neutral-300')} />}
            </div>

            <div
              className={clsx('relative flex flex-col items-center', onStepClick && !isUpcoming && 'cursor-pointer')}
              onClick={() => onStepClick && !isUpcoming && onStepClick(index)}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCurrent && <div className="absolute inset-0 rounded-full border-2 border-secondary-500 animate-pulse opacity-50 scale-125" />}

              <div
                className={clsx('relative z-10 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300', 'h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-base', {
                  'bg-secondary-500 border-secondary-500 text-white shadow-lg': isCompleted,

                  'border-secondary-500 text-white bg-secondary-500 shadow-xl scale-110 ring-4 ring-secondary-200': isCurrent,

                  'border-neutral-300 text-neutral-500 bg-white hover:border-neutral-400': isUpcoming,
                })}
              >
                {isCompleted ? <Check className="h-4 w-4 sm:h-6 sm:w-6" /> : <span className={clsx('font-bold', isCurrent && 'animate-pulse')}>{index + 1}</span>}
              </div>

              <p
                className={clsx('absolute whitespace-nowrap left-1/2 -translate-x-1/2 top-full mt-2 text-center text-[10px] sm:text-sm font-medium leading-tight transition-all duration-300', {
                  'text-secondary-600 font-bold text-xs sm:text-base scale-105': isCurrent,
                  'text-secondary-600 font-semibold': isCompleted,
                  'text-neutral-500': isUpcoming,
                })}
              >
                {step.label}
              </p>

              <p
                className={clsx('absolute left-1/2 -translate-x-1/2 top-full mt-8 text-center text-[10px] sm:text-sm font-medium leading-tight transition-all duration-300', {
                  'text-secondary-600 font-semibold': isCurrent,
                  'text-secondary-600': isCompleted,
                  'text-neutral-500': isUpcoming,
                })}
              >
                {step.date?.slice(0, 16)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Stepper;
