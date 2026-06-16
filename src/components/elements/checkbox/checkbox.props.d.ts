export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  labelClassName?: string;
  dir?: 'rtl' | 'ltr';
}
