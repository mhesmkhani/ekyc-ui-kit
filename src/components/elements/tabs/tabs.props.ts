import { ReactNode } from 'react';

export interface TabItem {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export type TabVariant = 'default' | 'pills' | 'underline';

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  variant?: TabVariant;
  fullWidth?: boolean; // New prop
  onTabChange?: (index: number) => void;
}
