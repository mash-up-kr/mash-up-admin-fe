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
  selectableRow?: {
    selectedCount: number;
    selectedRows: T[];
    setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
  };
  supportBar?: {
    totalCount: number;
    buttons?: ReactNode[];
  };
}

const TableSupportBar = ({
  totalCount,
  selectedCount,
  supportButtons,
}: {
  totalCount: number;
  selectedCount?: number;
  supportButtons?: ReactNode[];
}) => (
  <Styled.TableSupportBar>
    <Styled.TableSummary>
      <span>총 지원인원</span>
      <span>{totalCount}</span>
      {!!selectedCount && (
        <>
          <span />
          <span>{selectedCount}</span>
          <span>명 선택</span>
        </>
      )}
    </Styled.TableSummary>
    <Styled.TableSupportButtonContainer>
      {supportButtons?.map((button) => button)}
    </Styled.TableSupportButtonContainer>
  </Styled.TableSupportBar>
);

const RowCheckBox = ({
  isChecked,
  handleToggle,
}: {
  isChecked: boolean;
  handleToggle: ChangeEventHandler<HTMLInputElement>;
}) => (
  <Styled.TableColumn>
    <Styled.Center>
      <Checkbox isChecked={isChecked} handleToggle={handleToggle} />
    </Styled.Center>
  </Styled.TableColumn>
);

const Table = <T extends object>({
  prefix,
  columns,
  rows,
  selectableRow,
  supportBar,
}: TableProps<T>) => {
  const { selectedCount, selectedRows, setSelectedRows } = selectableRow!;
  const { totalCount, buttons: supportButtons } = supportBar!;

  const checkedValues = useRef<boolean[]>(
    rows.map((row) => {
      return selectedRows.some(
        (selectedRow) => JSON.stringify(selectedRow) === JSON.stringify(row),
      );
    }),
  );
  const isAllChecked = checkedValues.current.filter(Boolean).length === rows.length;

  const handleSelectRow: (index: number) => ChangeEventHandler<HTMLInputElement> =
    (index) => (e) => {
      console.log(e.target.checked);
      if (e.target.checked) {
        setSelectedRows?.((prev) => {
          return [...prev, rows[index]];
        });
        checkedValues.current[index] = true;
      } else {
        setSelectedRows?.((prev) => {
          return prev.filter(
            (selectedRow) => JSON.stringify(selectedRow) !== JSON.stringify(rows[index]),
          );
        });
        checkedValues.current[index] = false;
      }
    };

  const handleSelectAllRow: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelectedRows?.((prev) => {
        return [...new Set([...prev, ...rows])];
      });
      checkedValues.current = Array(rows.length).fill(true);
    } else {
      setSelectedRows?.((prev) => {
        return prev.filter(
          (selectedRow) => !rows.some((row) => JSON.stringify(row) === JSON.stringify(selectedRow)),
        );
      });
      checkedValues.current = Array(rows.length).fill(false);
    }
  };

  return (
    <Styled.TableContainer>
      {supportBar && (
        <TableSupportBar
          totalCount={totalCount}
          selectedCount={selectedCount}
          supportButtons={supportButtons}
        />
      )}
      <Styled.TableWrapper>
        <Styled.Table>
          <colgroup>
            {!!selectableRow && <col width="3%" />}
            {columns.map((column, columnIndex) => (
              <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
            ))}
          </colgroup>
          <Styled.TableHeader>
            <Styled.TableRow>
              {!!selectableRow && (
                <RowCheckBox isChecked={isAllChecked} handleToggle={handleSelectAllRow} />
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
            <colgroup>
              {!!selectableRow && <col width="3%" />}
              {columns.map((column, columnIndex) => (
                <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
              ))}
            </colgroup>
            <Styled.TableBody>
              {rows.map((row, rowIndex) => (
                <Styled.TableRow key={`${prefix}-row-${rowIndex}`}>
                  {!!selectableRow && (
                    <RowCheckBox
                      isChecked={checkedValues.current[rowIndex]}
                      handleToggle={handleSelectRow(rowIndex)}
                    />
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
      </Styled.TableWrapper>
    </Styled.TableContainer>
  );
};

export default Table;
