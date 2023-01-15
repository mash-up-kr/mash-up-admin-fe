import React from 'react';
import { BottomCTA, Button, Link, Pagination, SearchOptionBar, Table } from '@/components';
import * as Styled from './ScheduleList.styled';
import { TableColumn } from '@/components/common/Table/Table.component';
import { ScheduleResponse, ScheduleStatus } from '@/types/dto/schedule';
import { formatDate } from '@/utils/date';
import { PATH } from '@/constants';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { usePagination } from '@/hooks';

const rows: ScheduleResponse[] = [
  {
    name: '스케줄 명',
    endedAt: '2023-01-15',
    eventList: [],
    generationNumber: 13,
    scheduleId: 1,
    startedAt: '2023-01-15',
    status: ScheduleStatus.ADMIN_ONLY,
  },
];

const totalCount = rows.length;

const ScheduleList = () => {
  const columns: TableColumn<ScheduleResponse>[] = [
    {
      title: '스케줄 명',
      accessor: 'name',
      widthRatio: '20%',
    },
    {
      title: '스케줄 일시',
      accessor: 'name',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '등록 일시',
      accessor: 'name',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 일시',
      accessor: 'name',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 상태',
      accessor: 'name',
      widthRatio: '20%',
    },
  ];

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: rows.length,
  });

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
        rows={rows}
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
              selectBoxPosition: rows.length > 3 ? 'top' : 'bottom',
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
            selectBoxPosition: rows.length > 3 ? 'top' : 'bottom',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ScheduleList;
