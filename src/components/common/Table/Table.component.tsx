/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode, ChangeEventHandler, useRef } from 'react';
import { Checkbox } from '@/components';
import { NestedKeyOf } from '@/types';
import { getOwnValueByKey } from '@/utils';
import * as Styled from './Table.styled';

export interface TableColumn<T extends object> {
  title: string;
  accessor?: NestedKeyOf<T>;
  widthRatio: string;
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
  selectedRows?: T[];
  setSelectedRow?: React.Dispatch<React.SetStateAction<T[]>>;
}

const Table = <T extends object>({
  prefix,
  columns,
  rows,
  selectableRow,
  setSelectedRow,
}: TableProps<T>) => {
  const checkedValues = useRef<boolean[]>(Array(rows.length).fill(false));
  const isAllChecked = checkedValues.current.filter(Boolean).length === rows.length;

  const handleSelectRow: (index: number) => ChangeEventHandler<HTMLInputElement> =
    (index) => (e) => {
      if (e.target.checked) {
        setSelectedRow?.((prev) => {
          return [...prev, rows[index]];
        });
        checkedValues.current[index] = true;
      } else {
        setSelectedRow?.((prev) => {
          return prev.filter((selectedRow) => selectedRow !== rows[index]);
        });
        checkedValues.current[index] = false;
      }
    };

  const handleSelectAllRow: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelectedRow?.((prev) => {
        return [...new Set([...prev, ...rows])];
      });
      checkedValues.current = Array(rows.length).fill(true);
    } else {
      setSelectedRow?.((prev) => {
        return prev.filter((selectedRow) => !rows.includes(selectedRow));
      });
      checkedValues.current = Array(rows.length).fill(false);
    }
  };

  return (
    <Styled.TableContainer>
      <Styled.Table>
        <colgroup>
          {selectableRow && <col width="3%" />}
          {columns.map((column, columnIndex) => (
            <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
          ))}
        </colgroup>
        <Styled.TableHeader>
          <Styled.TableRow>
            {selectableRow && (
              <Styled.TableColumn>
                <Styled.Center>
                  <Checkbox isChecked={isAllChecked} handleToggle={handleSelectAllRow} />
                </Styled.Center>
              </Styled.TableColumn>
            )}
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
          {selectableRow && <col width="3%" />}
          <colgroup>
            {columns.map((column, columnIndex) => (
              <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
            ))}
          </colgroup>
          <Styled.TableBody>
            {rows.map((row, rowIndex) => (
              <Styled.TableRow key={`${prefix}-row-${rowIndex}`}>
                {selectableRow && (
                  <Styled.TableCell>
                    <Styled.Center>
                      <Checkbox
                        isChecked={checkedValues.current[rowIndex]}
                        handleToggle={handleSelectRow(rowIndex)}
                      />
                    </Styled.Center>
                  </Styled.TableCell>
                )}
                {columns.map((column, columnIndex) => {
                  const { accessor, renderCustomCell } = column;
                  const cellValue = accessor ? getOwnValueByKey(row, accessor) : null;

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
