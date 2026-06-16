export interface Column {
  key: string;
  label: string;
}

export interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
}
