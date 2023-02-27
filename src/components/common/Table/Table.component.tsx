import React, {
  ReactNode,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  Fragment,
  useMemo,
  MouseEventHandler,
} from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { ApplicationRequest, NestedKeyOf, ValueOf, Team } from '@/types';
import { getOwnValueByKey, isArray, isSameObject } from '@/utils';
import { colors } from '@/styles';
import QuestionFile from '@/assets/svg/question-file-72.svg';
import CaretUpdown from '@/assets/svg/caret-updown-16.svg';
import CaretUp from '@/assets/svg/caret-up-16.svg';
import * as Styled from './Table.styled';
import Loading from '../Loading/Loading.component';
import Checkbox from '../Checkbox/Checkbox.component';
import { SORT_TYPE, PATH } from '@/constants';
import { ToastType } from '../Toast/Toast.component';
import { useToast } from '@/hooks';
import { $profile } from '@/store';
import { Team as TeamNames, TeamType } from '@/components/common/UserProfile/UserProfile.component';

export type TextAlign = 'start' | 'center' | 'end';

export interface TableColumn<T extends object> {
  title: string;
  accessor?: NestedKeyOf<T> | NestedKeyOf<T>[];
  idAccessor?: NestedKeyOf<T>;
  widthRatio: string;
  textAlign?: TextAlign;
  renderCustomCell?: (
    cellValue: unknown,
    id: string,
    handleClickLink?: MouseEventHandler<HTMLButtonElement>,
    applicationParams?: ApplicationRequest,
  ) => ReactNode;
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
  topStickyHeight?: number;
  columns: TableColumn<T>[];
  rows: T[] | (T & { team: Team; platform: TeamType })[];
  isLoading?: boolean;
  selectableRow?: {
    selectedCount: number;
    selectedRows: T[];
    setSelectedRows: Dispatch<SetStateAction<T[]>>;
    handleSelectAll: (checkedValue: boolean) => void;
  };
  sortOptions?: SortOptions<T>;
  supportBar: {
    totalCount?: number;
    totalSummaryText?: string;
    selectedSummaryText?: string;
    buttons?: ReactNode[];
  };
  pagination?: ReactNode;
  applicationParams?: ApplicationRequest;
}

interface TableSupportBarProps {
  totalSummaryText?: string;
  selectedSummaryText?: string;
  totalCount?: number;
  selectedCount?: number;
  rowCount?: number;
  allInAPageChecked?: boolean;
  handleSelectAll?: (checkedValue: boolean) => void;
  supportButtons?: ReactNode[];
  topStickyHeight?: number;
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
  topStickyHeight,
}: TableSupportBarProps) => {
  const allChecked = totalCount === selectedCount;
  return (
    <Styled.TableSupportBar topStickyHeight={topStickyHeight}>
      {totalSummaryText && (
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
                    선택취소
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
      )}
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

  const titles = column.title.split(/\n/);

  if (!sortable) {
    return (
      <Styled.TableColumn textAlign={column.textAlign}>
        {titles.map((title, index) => (
          <>
            {title}
            {index !== titles.length - 1 && <br />}
          </>
        ))}
      </Styled.TableColumn>
    );
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
    <Styled.TableColumn
      textAlign={column.textAlign}
      sortable={!!sortOptions}
      onClick={() => handleClickColumn()}
    >
      {titles.map((title, index) => (
        <>
          {title}
          {index !== titles.length - 1 && <br />}
        </>
      ))}
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
  topStickyHeight,
  columns,
  rows,
  isLoading = false,
  selectableRow,
  sortOptions,
  supportBar: { totalCount, totalSummaryText, selectedSummaryText, buttons: supportButtons },
  pagination,
  applicationParams,
}: TableProps<T>) => {
  const { handleAddToast } = useToast();
  const { selectedCount, selectedRows, setSelectedRows, handleSelectAll } = selectableRow || {};
  const isEmptyData = rows.length === 0;
  const myTeamName = useRecoilValue($profile)[0];
  const { pathname: currentPath } = useLocation();

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

  const isCurrentPageIncludingPrivacy = useMemo(
    () => [PATH.APPLICATION, PATH.ACTIVITY_SCORE].some((path) => path === currentPath),
    [currentPath],
  );

  const checkIsCurrentRowAccessible = (rowTeamName: string) => {
    const myTeamNameAsLowercase = myTeamName.toLowerCase();
    return (
      myTeamName === TeamNames.mashUp ||
      myTeamName === TeamNames.branding ||
      rowTeamName === myTeamNameAsLowercase ||
      rowTeamName === myTeamNameAsLowercase
    );
  };

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
    <Styled.TableContainer>
      <TableSupportBar
        totalSummaryText={totalSummaryText}
        selectedSummaryText={selectedSummaryText}
        totalCount={totalCount}
        selectedCount={selectedCount}
        rowCount={rows.length}
        allInAPageChecked={allInAPageChecked}
        handleSelectAll={handleSelectAll}
        supportButtons={supportButtons}
        topStickyHeight={topStickyHeight}
      />
      <Styled.TableWrapper>
        <Styled.Table topStickyHeight={topStickyHeight && topStickyHeight + 6}>
          <colgroup>
            {!!selectableRow && <col width="4%" />}
            {columns.map((column, columnIndex) => (
              <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
            ))}
          </colgroup>
          <Styled.TableHeader>
            <Styled.TableRow>
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
          {isEmptyData ? (
            <Styled.NoData>
              <QuestionFile />
              <div>데이터가 없습니다.</div>
            </Styled.NoData>
          ) : (
            <>
              {isLoading && (
                <Loading
                  dimmedColor={colors.whiteLoadingDimmed}
                  spinnerColor={colors.whiteLoadingDimmed}
                />
              )}
              <Styled.Table>
                <colgroup>
                  {!!selectableRow && <col width="4%" />}
                  {columns.map((column, columnIndex) => (
                    <col key={`${prefix}-col-${columnIndex}`} width={column.widthRatio} />
                  ))}
                </colgroup>
                <Styled.TableBody>
                  {rows.map((row, rowIndex) => (
                    <Styled.TableRow key={`${prefix}-row-${rowIndex}`}>
                      {!!selectableRow && (
                        <RowCheckBox
                          isChecked={checkedValues[rowIndex]}
                          handleToggle={handleSelectRow(rowIndex)}
                        />
                      )}
                      {columns.map((column, columnIndex) => {
                        const { accessor, idAccessor, textAlign, renderCustomCell } = column;

                        const id = getOwnValueByKey(row, idAccessor);
                        const cellValue = isArray(accessor)
                          ? (accessor as any[]).map((accessorItem) =>
                              getOwnValueByKey(row, accessorItem as any),
                            )
                          : getOwnValueByKey(row, accessor as any);

                        const normalContents = renderCustomCell
                          ? renderCustomCell(cellValue, id, undefined, applicationParams)
                          : cellValue;

                        const blockContents = renderCustomCell
                          ? renderCustomCell(cellValue, id, () => {
                              handleAddToast({
                                type: ToastType.error,
                                message: '접근 권한이 없는 팀입니다.',
                              });
                            })
                          : cellValue;

                        if (!isCurrentPageIncludingPrivacy) {
                          return (
                            <Styled.TableCell key={`cell-${columnIndex}`} textAlign={textAlign}>
                              {normalContents}
                            </Styled.TableCell>
                          );
                        }

                        const rowTeamName =
                          ('team' in row && row.team.name.toLowerCase()) ||
                          ('platform' in row && row.platform.toLowerCase());

                        const isCurrentRowAccessible =
                          rowTeamName && checkIsCurrentRowAccessible(rowTeamName);

                        if (isCurrentRowAccessible) {
                          return (
                            <Styled.TableCell key={`cell-${columnIndex}`} textAlign={textAlign}>
                              {normalContents}
                            </Styled.TableCell>
                          );
                        }
                        return (
                          <Styled.TableCell key={`cell-${columnIndex}`} textAlign={textAlign}>
                            {blockContents}
                          </Styled.TableCell>
                        );
                      })}
                    </Styled.TableRow>
                  ))}
                </Styled.TableBody>
              </Styled.Table>
            </>
          )}
        </Styled.TableBodyWrapper>
      </Styled.TableWrapper>
      {!isEmptyData && pagination}
    </Styled.TableContainer>
  );
};

export default Table;
