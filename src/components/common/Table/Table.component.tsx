import React, {
  ReactNode,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  Fragment,
  useMemo,
} from 'react';
import { NestedKeyOf, ValueOf } from '@/types';
import { getOwnValueByKey, isSameObject } from '@/utils';
import { colors } from '@/styles';
import QuestionFile from '@/assets/svg/question-file-72.svg';
import CaretUpdown from '@/assets/svg/caret-updown-16.svg';
import CaretUp from '@/assets/svg/caret-up-16.svg';
import * as Styled from './Table.styled';
import Loading from '../Loading/Loading.component';
import Checkbox from '../Checkbox/Checkbox.component';
import { SORT_TYPE } from '@/constants';

const NAV_BAR_AND_SEARCH_BAR_HEIGHT = 187;
const TABLE_DEFAULT_HEIGHT = (window.innerHeight - NAV_BAR_AND_SEARCH_BAR_HEIGHT) / 10;
export interface TableColumn<T extends object> {
  title: string;
  accessor?: NestedKeyOf<T>;
  idAccessor?: NestedKeyOf<T>;
  widthRatio: string;
  renderCustomCell?: (cellVaule: unknown, id?: string) => ReactNode;
}

export interface SortType<T extends object> {
  accessor: NestedKeyOf<T>;
  type: ValueOf<typeof SORT_TYPE>;
}

interface SortOptions<T extends object> {
  sortTypes: SortType<T>[];
  disableMultiSort?: boolean;
  handleSortColumn: (sortTypes: SortType<T>[]) => void;
}

export interface TableProps<T extends object> {
  prefix: string;
  maxHeight?: number;
  columns: TableColumn<T>[];
  rows: T[];
  isLoading: boolean;
  selectableRow?: {
    selectedCount: number;
    selectedRows: T[];
    setSelectedRows: Dispatch<SetStateAction<T[]>>;
    handleSelectAll: (checkedValue: boolean) => void;
  };
  sortOptions?: SortOptions<T>;
  supportBar: {
    totalCount: number;
    totalSummaryText: string;
    selectedSummaryText?: string;
    buttons?: ReactNode[];
  };
  pagination?: ReactNode;
}

interface TableSupportBarProps {
  totalSummaryText: string;
  selectedSummaryText?: string;
  totalCount: number;
  selectedCount?: number;
  rowCount?: number;
  allInAPageChecked?: boolean;
  handleSelectAll?: (checkedValue: boolean) => void;
  supportButtons?: ReactNode[];
}

const TableSupportBar = ({
  totalSummaryText,
  selectedSummaryText,
  totalCount,
  selectedCount,
  rowCount,
  allInAPageChecked,
  handleSelectAll,
  supportButtons,
}: TableSupportBarProps) => {
  const allChecked = totalCount === selectedCount;
  return (
    <Styled.TableSupportBar>
      <Styled.TableSummary>
        <div>{totalSummaryText}</div>
        <div>{totalCount}</div>
        {!!selectedCount && (
          <>
            <div>
              <div />
            </div>
            <div>{selectedCount}</div>
            <div>{selectedSummaryText}</div>
          </>
        )}
        {allInAPageChecked && (
          <Styled.TotalSelectBox>
            {allChecked ? (
              <>
                <div>
                  모든 페이지에 있는 <span>{totalCount}개</span>가 모두 선택되었습니다.
                </div>
                <button type="button" onClick={() => handleSelectAll!(true)}>
                  선택최소
                </button>
              </>
            ) : (
              <>
                <div>
                  이 페이지에 있는 <span>{rowCount}개</span>가 모두 선택되었습니다.
                </div>
                <button type="button" onClick={() => handleSelectAll!(false)}>
                  전체인원 {totalCount}개 모두 선택
                </button>
              </>
            )}
          </Styled.TotalSelectBox>
        )}
      </Styled.TableSummary>
      <Styled.TableSupportButtonContainer>
        {supportButtons?.map((button, index) => (
          <Fragment key={`supportButton-${index}`}>{button}</Fragment>
        ))}
      </Styled.TableSupportButtonContainer>
    </Styled.TableSupportBar>
  );
};

const RowCheckBox = ({
  isChecked,
  handleToggle,
}: {
  isChecked: boolean;
  handleToggle: ChangeEventHandler<HTMLInputElement>;
}) => (
  <Styled.TableCell>
    <Styled.CheckboxWrapper>
      <Checkbox isChecked={isChecked} handleToggle={handleToggle} />
    </Styled.CheckboxWrapper>
  </Styled.TableCell>
);

const TableColumnCell = <T extends object>({
  column,
  sortOptions,
}: {
  column: TableColumn<T>;
  sortOptions?: SortOptions<T>;
}) => {
  const sortColumnIndex = useMemo(
    () => sortOptions?.sortTypes.findIndex((sortType) => sortType.accessor === column.accessor),
    [sortOptions, column],
  );
  const sortable = useMemo(
    () => sortOptions && sortColumnIndex !== -1,
    [sortOptions, sortColumnIndex],
  );

  if (!sortable) {
    return <Styled.TableColumn>{column.title}</Styled.TableColumn>;
  }

  const handleClickColumn = () => {
    if (!sortOptions) return;

    const getNextType = (sortType: ValueOf<typeof SORT_TYPE>) => {
      if (sortType === SORT_TYPE.DEFAULT) {
        return SORT_TYPE.ASC;
      }
      if (sortType === SORT_TYPE.ASC) {
        return SORT_TYPE.DESC;
      }

      return SORT_TYPE.DEFAULT;
    };
    let nextSortTypes: SortType<T>[] = [...sortOptions.sortTypes];
    const nextSortType: SortType<T> = {
      ...nextSortTypes[sortColumnIndex!],
      type: getNextType(nextSortTypes[sortColumnIndex!].type),
    };
    nextSortTypes.splice(sortColumnIndex!, 1);

    if (sortOptions.disableMultiSort) {
      nextSortTypes = nextSortTypes.map((sortType) => {
        return {
          ...sortType,
          type: SORT_TYPE.DEFAULT,
        };
      });
    }

    nextSortTypes.push(nextSortType);

    sortOptions?.handleSortColumn(nextSortTypes);
  };

  return (
    <Styled.TableColumn sortable={!!sortOptions} onClick={() => handleClickColumn()}>
      {column.title}
      {sortOptions &&
        (sortOptions.sortTypes[sortColumnIndex!].type === SORT_TYPE.DEFAULT ? (
          <CaretUpdown />
        ) : (
          <Styled.CaretUpWrapper type={sortOptions.sortTypes[sortColumnIndex!].type}>
            <CaretUp />
          </Styled.CaretUpWrapper>
        ))}
    </Styled.TableColumn>
  );
};

const Table = <T extends object>({
  prefix,
  maxHeight = TABLE_DEFAULT_HEIGHT,
  columns,
  rows,
  isLoading,
  selectableRow,
  sortOptions,
  supportBar: { totalCount, totalSummaryText, selectedSummaryText, buttons: supportButtons },
  pagination,
}: TableProps<T>) => {
  const { selectedCount, selectedRows, setSelectedRows, handleSelectAll } = selectableRow || {};
  const DEFAULT_ROW_HEIGHT = 5.2;
  const INNER_TABLE_EXTERNAL_BODY_HEIGHT = 15.6;
  const bodyHeight = maxHeight! - INNER_TABLE_EXTERNAL_BODY_HEIGHT;
  const itemSizeInnerBody = Math.floor(bodyHeight / DEFAULT_ROW_HEIGHT);
  const isEmptyData = rows.length === 0;

  const checkedValues = useMemo(
    () =>
      selectedRows
        ? rows.map((row) => selectedRows.some((selectedRow) => isSameObject(selectedRow, row)))
        : [],
    [selectedRows, rows],
  );
  const allInAPageChecked = useMemo(
    () => !!rows.length && checkedValues.filter(Boolean).length === rows.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedValues],
  );

  const handleSelectRow: (index: number) => ChangeEventHandler<HTMLInputElement> =
    (index) => (e) => {
      if (e.target.checked) {
        setSelectedRows?.((prev) => [...prev, rows[index]]);
      } else {
        setSelectedRows?.((prev) =>
          prev.filter((selectedRow) => !isSameObject(selectedRow, rows[index])),
        );
      }
    };

  const handleSelectAllRow: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelectedRows?.((prev) => [
        ...prev.filter((selectedRow) => !rows.some((row) => isSameObject(row, selectedRow))),
        ...rows,
      ]);
    } else {
      setSelectedRows?.((prev) =>
        prev.filter((selectedRow) => !rows.some((row) => isSameObject(row, selectedRow))),
      );
    }
  };

  return (
    <Styled.TableContainer height={rows.length >= itemSizeInnerBody ? `${maxHeight}rem` : 'auto'}>
      <TableSupportBar
        totalSummaryText={totalSummaryText}
        selectedSummaryText={selectedSummaryText}
        totalCount={totalCount}
        selectedCount={selectedCount}
        rowCount={rows.length}
        allInAPageChecked={allInAPageChecked}
        handleSelectAll={handleSelectAll}
        supportButtons={supportButtons}
      />
      <Styled.TableWrapper>
        <Styled.Table>
          <colgroup>
            {!!selectableRow && <col width="4%" />}
            {columns.map((column, columnIndex) => (
              <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
            ))}
          </colgroup>
          <Styled.TableHeader>
            <Styled.TableRow height={DEFAULT_ROW_HEIGHT}>
              {!!selectableRow && (
                <RowCheckBox isChecked={allInAPageChecked} handleToggle={handleSelectAllRow} />
              )}
              {columns.map((column, columnIndex) => (
                <TableColumnCell
                  key={`${prefix}-column-${columnIndex}`}
                  column={column}
                  sortOptions={sortOptions}
                />
              ))}
            </Styled.TableRow>
          </Styled.TableHeader>
        </Styled.Table>
        <Styled.TableBodyWrapper isLoading={isLoading}>
          <Styled.Table>
            {isEmptyData ? (
              <Styled.TableBody isEmpty>
                <Styled.TableRow height={DEFAULT_ROW_HEIGHT * 5}>
                  <Styled.TableCell>
                    <Styled.Center>
                      <Styled.NoData>
                        <QuestionFile />
                        <div>데이터가 없습니다.</div>
                      </Styled.NoData>
                    </Styled.Center>
                  </Styled.TableCell>
                </Styled.TableRow>
              </Styled.TableBody>
            ) : (
              <>
                <colgroup>
                  {!!selectableRow && <col width="4%" />}
                  {columns.map((column, columnIndex) => (
                    <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
                  ))}
                </colgroup>
                <Styled.TableBody>
                  {isLoading && (
                    <Loading
                      dimmedColor={colors.whiteLoadingDimmed}
                      spinnerColor={colors.whiteLoadingDimmed}
                    />
                  )}
                  {rows.map((row, rowIndex) => (
                    <Styled.TableRow key={`${prefix}-row-${rowIndex}`} height={DEFAULT_ROW_HEIGHT}>
                      {!!selectableRow && (
                        <RowCheckBox
                          isChecked={checkedValues[rowIndex]}
                          handleToggle={handleSelectRow(rowIndex)}
                        />
                      )}
                      {columns.map((column, columnIndex) => {
                        const { accessor, idAccessor, renderCustomCell } = column;
                        const cellValue = accessor ? getOwnValueByKey(row, accessor) : null;
                        const id = idAccessor ? getOwnValueByKey(row, idAccessor) : null;

                        return (
                          <Styled.TableCell key={`cell-${columnIndex}`}>
                            {renderCustomCell ? renderCustomCell(cellValue, id) : cellValue}
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
      {!isEmptyData && pagination}
    </Styled.TableContainer>
  );
};

export default Table;
