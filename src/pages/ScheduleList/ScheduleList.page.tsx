import React, { useEffect, useMemo, MouseEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import {
  BottomCTA,
  Button,
  Link,
  Pagination,
  SearchOptionBar,
  Table,
  TeamNavigationTabs,
} from '@/components';
import * as Styled from './ScheduleList.styled';
import { TableColumn } from '@/components/common/Table/Table.component';
import { ScheduleRequest, ScheduleResponse, ScheduleStatus } from '@/types/dto/schedule';
import { formatDate } from '@/utils/date';
import { getScheduleDetailPage, PATH } from '@/constants';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { usePagination, useToast } from '@/hooks';
import { $generationNumber, $isMaster, $profile } from '@/store';
import { $schedules } from '@/store/schedule';
import { ValueOf } from '@/types';
import { getScheduleStatusText, SchedulePlatformType } from '@/utils';
import { ToastType } from '@/styles';

const ScheduleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const generationNumber = useRecoilValue($generationNumber);
  const [position] = useRecoilValue($profile);
  const isMaster = useRecoilValue($isMaster);
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '10';
  const searchWord = searchParams.get('searchWord') || '';

  const { pathname, search } = useLocation();
  const { handleAddToast } = useToast();

  const handleClickLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isMaster && teamName !== position) {
      handleAddToast({
        type: ToastType.error,
        message: '접근 권한이 없는 플랫폼입니다.',
      });
      event.preventDefault();
    }
  };

  const columns: TableColumn<ScheduleResponse>[] = [
    {
      title: '스케줄 명',
      accessor: 'name',
      widthRatio: '20%',
      idAccessor: 'scheduleId',
      renderCustomCell: ({ cellValue, id }) => (
        <Styled.TitleLink
          to={getScheduleDetailPage(id)}
          state={{ from: `${pathname}${search}` }}
          onClick={handleClickLink}
        >
          {cellValue as string}
        </Styled.TitleLink>
      ),
    },
    {
      title: '스케줄 일시',
      accessor: 'startedAt',
      widthRatio: '20%',
      renderCustomCell: ({ cellValue }) =>
        formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '등록 일시',
      accessor: 'createdAt',
      widthRatio: '20%',
      renderCustomCell: ({ cellValue }) =>
        formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 일시',
      accessor: 'publishedAt',
      widthRatio: '20%',
      renderCustomCell: ({ cellValue }) =>
        formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '배포 상태',
      accessor: 'status',
      widthRatio: '20%',
      renderCustomCell: ({ cellValue }) => {
        const value = cellValue as ValueOf<typeof ScheduleStatus>;

        return getScheduleStatusText(value);
      },
    },
  ];

  const scheduleParams = useMemo<ScheduleRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      searchWord,
      generationNumber,
      scheduleType: (teamName as ValueOf<typeof SchedulePlatformType>) ?? 'ALL',
    }),
    [generationNumber, page, searchWord, size, teamName],
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
        <TeamNavigationTabs allAltText="All Seminar" />
        <SearchOptionBar placeholder="스케줄명 검색" />
      </Styled.StickyContainer>
      <Table
        prefix="schedule"
        topStickyHeight={9.2}
        columns={columns}
        rows={tableRows}
        supportBar={{
          totalCount,
          totalSummaryText: '총 개수',
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
