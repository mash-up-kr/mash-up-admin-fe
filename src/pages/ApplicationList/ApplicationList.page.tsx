import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { Button, Pagination, SearchOptionBar, Table, TeamNavigationTabs } from '@/components';
import { formatDate } from '@/utils';
import { SORT_TYPE } from '@/constants';
import { $applications, $teamIdByName } from '@/store';
import { usePagination } from '@/hooks';
import { ApplicationResponse } from '@/types';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import * as Styled from './ApplicationList.styled';

const columns: TableColumn<ApplicationResponse>[] = [
  {
    title: '이름',
    accessor: 'applicant.name',
    widthRatio: '10%',
  },
  {
    title: '전화번호',
    accessor: 'applicant.phoneNumber',
    widthRatio: '15%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team.name',
    widthRatio: '10%',
  },
  {
    title: '면접 일시',
    accessor: 'result.interviewStartedAt',
    widthRatio: '25%',
    renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
  },
  {
    title: '사용자확인여부',
    accessor: 'confirmationStatus',
    widthRatio: '25%',
  },
  {
    title: '합격여부',
    accessor: 'result.status',
    widthRatio: '20%',
  },
];

const ApplicationList = () => {
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const teamId = useRecoilValue($teamIdByName(teamName));

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

  const [searchWord, setSearchWord] = useState<{ value: string }>({ value: '' });
  const applicationParams = useMemo<ApplicationResponse>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      teamId: parseInt(teamId, 10) || undefined,
      searchWord: searchWord.value,
    }),
    [page, size, teamId, searchWord],
  );

  const [{ state, contents: tableRows }] = useRecoilStateLoadable($applications(applicationParams));
  const refreshApplications = useRecoilRefresher_UNSTABLE($applications(applicationParams));

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<ApplicationResponse[]>([]);

  const [selectedRows, setSelectedRows] = useState<ApplicationResponse[]>([]);
  const [sortTypes, setSortTypes] = useState<SortType<ApplicationResponse>[]>([
    { accessor: 'applicant.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'result.interviewStartedAt', type: SORT_TYPE.DEFAULT },
  ]);

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(
    tableRows.page?.totalCount,
  );

  const handleSearch = (
    e: { target: { searchWord: { value: string } } } & FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setSearchWord({ value: e.target.searchWord.value });
  };

  useEffect(() => {
    if (!isLoading) {
      setLoadedTableRows(tableRows.data);
    }
  }, [isLoading, tableRows]);

  useEffect(() => {
    refreshApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, searchWord]);

  useEffect(() => {
    refreshApplications();
    setSearchWord({ value: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>지원서 내역</Styled.Heading>
      <TeamNavigationTabs />
      <SearchOptionBar searchWord={searchWord} handleSubmit={handleSearch} />
      <Table
        prefix="application"
        maxHeight={72}
        columns={columns}
        rows={loadedTableRows}
        isLoading={isLoading}
        supportBar={{
          totalCount: tableRows.page?.totalCount,
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
          handleSelectAll: () => {},
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
