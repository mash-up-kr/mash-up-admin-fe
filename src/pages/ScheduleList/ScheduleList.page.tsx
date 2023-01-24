import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { BottomCTA, Button, Link, Pagination, SearchOptionBar, Table } from '@/components';
import * as Styled from './ScheduleList.styled';
import { TableColumn } from '@/components/common/Table/Table.component';
import { ScheduleRequest, ScheduleResponse, ScheduleStatus } from '@/types/dto/schedule';
import { formatDate } from '@/utils/date';
import { PATH } from '@/constants';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { usePagination } from '@/hooks';
import { $generationNumber } from '@/store';
import { $schedules } from '@/store/schedule';
import { ValueOf } from '@/types';

const ScheduleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const generationNumber = useRecoilValue($generationNumber);
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';
  const searchWord = searchParams.get('searchWord') || '';

  const columns: TableColumn<ScheduleResponse>[] = [
    {
      title: '스케줄 명',
      accessor: 'name',
      widthRatio: '20%',
    },
    {
      title: '스케줄 일시',
      accessor: 'startedAt',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '등록 일시',
      accessor: 'createdAt',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 일시',
      accessor: 'publishedAt',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 상태',
      accessor: 'status',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => {
        const value = cellValue as ValueOf<typeof ScheduleStatus>;

        if (value === ScheduleStatus.ADMIN_ONLY) {
          return '-';
        }

        if (value === ScheduleStatus.PUBLIC) {
          return '배포 완료';
        }

        return '';
      },
    },
  ];

  const scheduleParams = useMemo<ScheduleRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      searchWord,
      generationNumber,
    }),
    [generationNumber, page, searchWord, size],
  );

  const [{ contents }] = useRecoilStateLoadable($schedules(scheduleParams));

  const tableRows = contents.data ?? [];
  const { totalCount = 0 } = contents.page ?? {};

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount,
    pagingSize: 10,
  });

  useEffect(() => {
    searchParams.delete('searchWord');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamName]);

  useEffect(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationNumber]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>스케줄 정보 </Styled.Heading>
      <Styled.StickyContainer>
        <SearchOptionBar placeholder="스케줄명 검색" />
      </Styled.StickyContainer>
      <Table
        prefix="schedule"
        topStickyHeight={14.1}
        columns={columns}
        rows={tableRows}
        supportBar={{
          totalCount,
          totalSummaryText: '총 지원설문지',
          buttons: [
            <Link to={PATH.SCHEDULE_CREATE}>
              <Button $size={ButtonSize.xs} shape={ButtonShape.defaultLine}>
                스케줄 추가
              </Button>
            </Link>,
          ],
        }}
        pagination={
          <Pagination
            pageOptions={pageOptions}
            selectableSize={{
              selectBoxPosition: tableRows.length > 3 ? 'top' : 'bottom',
              handleChangeSize,
            }}
            handleChangePage={handleChangePage}
          />
        }
      />
      <BottomCTA
        boundaries={{
          visibility: { topHeight: 179, bottomHeight: 20 },
          noAnimation: { bottomHeight: 20 },
        }}
      >
        <Pagination
          pageOptions={pageOptions}
          selectableSize={{
            selectBoxPosition: tableRows.length > 3 ? 'top' : 'bottom',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ScheduleList;
