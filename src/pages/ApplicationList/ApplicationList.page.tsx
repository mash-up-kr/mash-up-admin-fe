import React, {
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  FormEvent,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import * as api from '@/api';
import { Button, Pagination, SearchOptionBar, Table, TeamNavigationTabs } from '@/components';
import { formatDate } from '@/utils';
import { PATH, SORT_TYPE } from '@/constants';
import { $applications, $teamIdByName } from '@/store';
import { useDirty, usePagination } from '@/hooks';
import { ApplicationRequest, ApplicationResponse } from '@/types';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import * as Styled from './ApplicationList.styled';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';

const APPLICATION_EXTRA_SIZE = 100;

const columns: TableColumn<ApplicationResponse>[] = [
  {
    title: '이름',
    accessor: 'applicant.name',
    idAccessor: 'applicationId',
    widthRatio: '10%',
    renderCustomCell: (cellValue, id) => (
      <Styled.FormTitleWrapper title={cellValue as string}>
        <Styled.FormTitle>{cellValue as string}</Styled.FormTitle>
        <Styled.TitleLink to={`${PATH.APPLICATION}/${id}`} />
      </Styled.FormTitleWrapper>
    ),
  },
  {
    title: '전화번호',
    accessor: 'applicant.phoneNumber',
    widthRatio: '14%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team.name',
    widthRatio: '8%',
  },
  {
    title: '지원일시',
    accessor: 'updatedAt',
    widthRatio: '21%',
    renderCustomCell: (cellValue) =>
      cellValue ? formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분') : '-',
  },
  {
    title: '면접일시',
    accessor: 'result.interviewStartedAt',
    widthRatio: '21%',
    renderCustomCell: (cellValue) =>
      cellValue ? formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분') : '-',
  },
  {
    title: '사용자확인여부',
    accessor: 'confirmationStatus',
    widthRatio: '13%',
    renderCustomCell: (cellValue) => (
      <Styled.Center>
        <ApplicationStatusBadge
          text={ApplicationConfirmationStatus[cellValue as ApplicationConfirmationStatusKeyType]}
        />
      </Styled.Center>
    ),
  },
  {
    title: '합격여부',
    accessor: 'result.status',
    widthRatio: '13%',
    renderCustomCell: (cellValue) => (
      <Styled.Center>
        <ApplicationStatusBadge
          text={ApplicationResultStatus[cellValue as ApplicationResultStatusKeyType]}
        />
      </Styled.Center>
    ),
  },
];

const ApplicationList = () => {
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const teamId = useRecoilValue($teamIdByName(teamName));
  const teamTabRef = useRef<HTMLDivElement>(null);

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

  const [searchWord, setSearchWord] = useState<{ value: string }>({ value: '' });

  const [sortTypes, setSortTypes] = useState<SortType<ApplicationResponse>[]>([
    { accessor: 'applicant.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'updatedAt', type: SORT_TYPE.DEFAULT },
    { accessor: 'result.interviewStartedAt', type: SORT_TYPE.DEFAULT },
  ]);
  const sortParam = useMemo(() => {
    const matched = sortTypes.find((sortType) => sortType.type !== SORT_TYPE.DEFAULT);
    if (!matched) return '';

    const { accessor, type } = matched;
    const accessorKeys = accessor.split('.');

    if (accessorKeys[0] === 'result') {
      const resultAccessor = ['applicationResult'].concat(accessorKeys.slice(1)).join('.');
      return `${resultAccessor},${type}`;
    }

    return `${accessor},${type}`;
  }, [sortTypes]);

  const applicationParams = useMemo<ApplicationRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      teamId: parseInt(teamId, 10) || undefined,
      searchWord: searchWord.value,
      sort: sortParam,
    }),
    [page, size, teamId, searchWord, sortParam],
  );

  const [totalCount, setTotalCount] = useState(0);
  const [{ state, contents: tableRows }] = useRecoilStateLoadable($applications(applicationParams));
  const [selectedRows, setSelectedRows] = useState<ApplicationResponse[]>([]);

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<ApplicationResponse[]>(
    tableRows.data || [],
  );

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(
    tableRows.page?.totalCount,
  );

  const { makeDirty, isDirty } = useDirty(1);

  const handleSearch = (
    e: { target: { searchWord: { value: string } } } & FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setSearchWord({ value: e.target.searchWord.value });
  };

  const handleSelectAll = useCallback(
    async (checkedValue) => {
      if (checkedValue) {
        setSelectedRows([]);
      } else {
        const applications = await api.getApplications({
          page: 0,
          size: tableRows.page.totalCount + APPLICATION_EXTRA_SIZE,
        });
        setSelectedRows(applications.data);
        if (applications.page) {
          setTotalCount(applications.page.totalCount);
        }
      }
    },
    [tableRows.page?.totalCount],
  );

  useEffect(() => {
    if (!isLoading) {
      setLoadedTableRows(tableRows.data);
      setTotalCount(tableRows.page.totalCount);
      makeDirty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, tableRows]);

  useEffect(() => {
    setSearchWord({ value: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamName]);

  useLayoutEffect(() => {
    if (teamTabRef.current && isDirty && !isLoading) {
      window.scrollTo(0, teamTabRef.current.offsetTop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTableRows]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>지원서 내역</Styled.Heading>
      <div ref={teamTabRef}>
        <TeamNavigationTabs />
      </div>
      <SearchOptionBar searchWord={searchWord} handleSubmit={handleSearch} />
      <Table
        prefix="application"
        columns={columns}
        rows={loadedTableRows}
        isLoading={isLoading}
        supportBar={{
          totalCount,
          totalSummaryText: '총 지원인원',
          selectedSummaryText: '명 선택',
          buttons: [
            <Button $size={ButtonSize.xs} shape={ButtonShape.defaultLine}>
              SMS 발송
            </Button>,
            <Button $size={ButtonSize.xs} shape={ButtonShape.defaultLine}>
              합격 여부 변경
            </Button>,
            <Button $size={ButtonSize.xs} shape={ButtonShape.defaultLine}>
              Export to Google Sheets
            </Button>,
          ],
        }}
        selectableRow={{
          selectedCount: selectedRows.length,
          selectedRows,
          setSelectedRows,
          handleSelectAll,
        }}
        sortOptions={{
          sortTypes,
          disableMultiSort: true,
          handleSortColumn: (_sortTypes) => {
            setSortTypes(_sortTypes);
          },
        }}
        pagination={
          <Pagination
            pageOptions={pageOptions}
            selectableSize
            selectBoxPosition={loadedTableRows.length > 3 ? 'top' : 'bottom'}
            handleChangePage={handleChangePage}
            handleChangeSize={handleChangeSize}
          />
        }
      />
    </Styled.PageWrapper>
  );
};

export default ApplicationList;
