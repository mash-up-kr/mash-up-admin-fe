/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';
import { NestedKeyOf } from '@/types';
import { getOwnValueByKey } from '@/utils';

export interface TableColumn<T extends object> {
  title: string;
  accessor: NestedKeyOf<T>;
  sortable?: boolean;
  CustomCell?: ReactNode;
}

interface TableProps<T extends object> {
  prefix: string;
  height?: string;
  columns: TableColumn<T>[];
  rows: T[];
  isLoading: boolean;
  sortType?: string[];
  sortColumn?: string[];
  handleSortColumn?: () => void;
  selectableRow?: boolean;
  handleSelectTotalRow?: () => void;
}

const Table = <T extends object>({ prefix, columns, rows }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th key={`${prefix}-column-${columnIndex}`}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${prefix}-row-${rowIndex}`}>
            {columns.map((column, columnIndex) => (
              <td key={`cell-${columnIndex}`}>{getOwnValueByKey(row, column.accessor)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
