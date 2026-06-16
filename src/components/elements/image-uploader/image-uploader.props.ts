export interface ImageUploaderProps {
  title?: string;
  subtitle?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  value?: File | File[] | string | string[] | null;
  onChange?: (files: File | File[]) => void;
  onError?: (error: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  preview?: boolean;
  placeholder?: React.ReactNode;
  enableZoom?: boolean;
}

export interface PreviewFile {
  file: File;
  url: string;
  name: string;
  size: number;
}
