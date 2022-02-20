/* eslint-disable react/no-unused-prop-types */
import React, {
  ReactNode,
  ChangeEventHandler,
  useRef,
  Dispatch,
  SetStateAction,
  Fragment,
} from 'react';
import { NestedKeyOf } from '@/types';
import { getOwnValueByKey, isSameObject } from '@/utils';
import * as Styled from './Table.styled';
import Loading from '../Loading/Loading.component';
import Checkbox from '../Checkbox/Checkbox.component';

export interface TableColumn<T extends object> {
  title: string;
  accessor?: NestedKeyOf<T>;
  widthRatio: string;
  sortable?: boolean;
  renderCustomCell?: (cellVaule: unknown) => ReactNode;
}

interface TableProps<T extends object> {
  prefix: string;
  maxHeight?: number;
  columns: TableColumn<T>[];
  rows: T[];
  isLoading: boolean;
  sortType?: string[];
  sortColumn?: string[];
  handleSortColumn?: () => void;
  selectableRow?: {
    selectedCount: number;
    selectedRows: T[];
    setSelectedRows: Dispatch<SetStateAction<T[]>>;
  };
  supportBar: {
    totalCount: number;
    buttons?: ReactNode[];
  };
  pagination?: ReactNode;
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
      {supportButtons?.map((button, index) => (
        <Fragment key={`supportButton-${index}`}>{button}</Fragment>
      ))}
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
  maxHeight,
  columns,
  rows,
  isLoading,
  selectableRow,
  supportBar: { totalCount, buttons: supportButtons },
  pagination,
}: TableProps<T>) => {
  const { selectedCount, selectedRows, setSelectedRows } = selectableRow || {};
  const DEFAULT_ROW_HEIGHT = 5.2;
  const INNER_TABLE_EXTERNAL_BODY_HEIGHT = 15.6;
  const bodyHeight = maxHeight! - INNER_TABLE_EXTERNAL_BODY_HEIGHT;
  const itemSizeInnerBody = Math.floor(bodyHeight / DEFAULT_ROW_HEIGHT);

  const checkedValues = useRef<boolean[]>(
    selectedRows
      ? rows.map((row) => {
          return selectedRows.some((selectedRow) => isSameObject(selectedRow, row));
        })
      : [],
  );
  const isAllChecked = checkedValues.current.filter(Boolean).length === rows.length;

  const handleSelectRow: (index: number) => ChangeEventHandler<HTMLInputElement> =
    (index) => (e) => {
      if (e.target.checked) {
        setSelectedRows?.((prev) => {
          return [...prev, rows[index]];
        });
        checkedValues.current[index] = true;
      } else {
        setSelectedRows?.((prev) => {
          return prev.filter((selectedRow) => !isSameObject(selectedRow, rows[index]));
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
        return prev.filter((selectedRow) => !rows.some((row) => isSameObject(row, selectedRow)));
      });
      checkedValues.current = Array(rows.length).fill(false);
    }
  };

  return (
    <Styled.TableContainer height={rows.length >= itemSizeInnerBody ? `${maxHeight}rem` : 'auto'}>
      <TableSupportBar
        totalCount={totalCount}
        selectedCount={selectedCount}
        supportButtons={supportButtons}
      />
      <Styled.TableWrapper>
        <Styled.Table>
          <colgroup>
            {!!selectableRow && <col width="3%" />}
            {columns.map((column, columnIndex) => (
              <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
            ))}
          </colgroup>
          <Styled.TableHeader>
            <Styled.TableRow height={DEFAULT_ROW_HEIGHT}>
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
        <Styled.TableBodyWrapper isLoading={isLoading}>
          {rows.length !== 0 && isLoading && <Loading />}
          <Styled.Table>
            {rows.length === 0 ? (
              <Styled.NoData height={bodyHeight}>No data found</Styled.NoData>
            ) : (
              <>
                <colgroup>
                  {!!selectableRow && <col width="3%" />}
                  {columns.map((column, columnIndex) => (
                    <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
                  ))}
                </colgroup>
                <Styled.TableBody>
                  {rows.map((row, rowIndex) => (
                    <Styled.TableRow key={`${prefix}-row-${rowIndex}`} height={DEFAULT_ROW_HEIGHT}>
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
              </>
            )}
          </Styled.Table>
        </Styled.TableBodyWrapper>
      </Styled.TableWrapper>
      {pagination}
    </Styled.TableContainer>
  );
};

export default Table;
