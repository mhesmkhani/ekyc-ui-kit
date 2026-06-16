import { HTMLAttributes } from 'react';

export interface Step {
  id: string | number;
  label: string;
  date?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}
