import React from 'react';

import type { TableProps } from './simple-table.props';

const SimpleTable = React.forwardRef<HTMLTableElement, TableProps>(({ columns, data, className = '' }, ref) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table ref={ref} className={`w-full ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={column.key} className={`p-3 text-center font-light text-gray-700 ${index !== columns.length - 1 ? 'border-e' : ''} border-gray-200`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white text-center">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200">
              {columns.map((column, index) => (
                <td key={column.key} className={`p-3 font-medium text-neutral-800 ${index !== columns.length - 1 ? 'border-e' : ''} border-gray-200`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

SimpleTable.displayName = 'Table';

export default SimpleTable;
