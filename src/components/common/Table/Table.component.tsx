/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';
import { NestedKeyOf } from '@/types';
import { getOwnValueByKey } from '@/utils';
import * as Styled from './Table.styled';

export interface TableColumn<T extends object> {
  title: string;
  accessor: NestedKeyOf<T>;
  sortable?: boolean;
  renderCustomCell?: (cellVaule: unknown) => ReactNode;
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
    <Styled.TableContainer>
      <Styled.Table>
        <Styled.TableHeader>
          <Styled.TableRow>
            {columns.map((column, columnIndex) => (
              <Styled.TableColumn key={`${prefix}-column-${columnIndex}`}>
                {column.title}
              </Styled.TableColumn>
            ))}
          </Styled.TableRow>
        </Styled.TableHeader>
      </Styled.Table>
      <Styled.TableBodyWrapper>
        <Styled.Table>
          <Styled.TableBody>
            {rows.map((row, rowIndex) => (
              <Styled.TableRow key={`${prefix}-row-${rowIndex}`}>
                {columns.map((column, columnIndex) => {
                  const { accessor, renderCustomCell } = column;
                  const cellValue = getOwnValueByKey(row, accessor);

                  return (
                    <Styled.TableCell key={`cell-${columnIndex}`}>
                      {renderCustomCell ? renderCustomCell(cellValue) : cellValue}
                    </Styled.TableCell>
                  );
                })}
              </Styled.TableRow>
            ))}
          </Styled.TableBody>
        </Styled.Table>
      </Styled.TableBodyWrapper>
    </Styled.TableContainer>
  );
};

export default Table;
