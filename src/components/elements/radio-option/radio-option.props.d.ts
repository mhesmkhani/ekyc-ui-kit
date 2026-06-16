export interface RadioOptionProps {
  id?: string;
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  labelClassName?: string;
  dir?: 'rtl' | 'ltr';
}
