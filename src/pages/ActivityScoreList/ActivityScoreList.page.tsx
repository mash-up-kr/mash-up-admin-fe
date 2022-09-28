import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BottomCTA, Pagination, SearchOptionBar, Table, TeamNavigationTabs } from '@/components';
import * as Styled from './ActivityScoreList.styled';
import { SearchOptionBarFilter } from '@/components/common/SearchOptionBar/SearchOptionBar.component';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { PATH, SORT_TYPE } from '@/constants';
import { usePagination } from '@/hooks';
import { $generations } from '@/store';

interface ActivityScoreListItem {
  name: string;
  userId: string;
  platform: string;
  score: number;
}

// TODO(@mango906): 서버쪽과 api 논의 후 서버쪽 데이터 쓰도록 변경 필요
const rows: ActivityScoreListItem[] = new Array(10).fill({
  name: '김경환',
  userId: 'besign',
  platform: 'Spring',
  score: 3,
});

const ActivityScoreList = () => {
  const generations = useRecoilValue($generations);

  const [sortTypes, setSortTypes] = useState<SortType<ActivityScoreListItem>[]>([
    { accessor: 'name', type: SORT_TYPE.DEFAULT },
    { accessor: 'score', type: SORT_TYPE.DEFAULT },
  ]);

  const filters: SearchOptionBarFilter[] = [
    {
      title: '기수',
      key: 'generations',
      options: generations.map(({ generationNumber, generationId }) => ({
        label: `${generationNumber}기`,
        value: generationId.toString(),
      })),
    },
  ];

  const { pathname, search } = useLocation();

  const totalCount = rows.length;

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount,
    pagingSize: 10,
  });

  // TODO(@mango906): 서버쪽과 api 논의 후 accessor 밑 renderCustomCell 변경 필요
  const columns: TableColumn<ActivityScoreListItem>[] = [
    {
      title: '이름',
      widthRatio: '25%',
      accessor: 'name',
      renderCustomCell: (cellValue, id) => (
        <Styled.TitleLink
          to={`${PATH.ACTIVITY_SCORE}/${id}`}
          state={{ from: `${pathname}${search}` }}
        >
          {cellValue as string}
        </Styled.TitleLink>
      ),
    },
    {
      title: '아이디',
      widthRatio: '25%',
      accessor: 'userId',
    },
    {
      title: '플랫폼',
      widthRatio: '25%',
      accessor: 'platform',
    },
    {
      title: '활동점수',
      widthRatio: '25%',
      accessor: 'score',
    },
  ];

  return (
    <Styled.PageWrapper>
      <Styled.Heading>활동점수</Styled.Heading>
      <Styled.StickyContainer>
        <TeamNavigationTabs />
        <SearchOptionBar placeholder="이름 검색" filters={filters} />
      </Styled.StickyContainer>
      <Table
        prefix="activity-score"
        topStickyHeight={14.1}
        columns={columns}
        rows={rows}
        supportBar={{ totalSummaryText: '총 인원', totalCount }}
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
            selectableSize={{
              selectBoxPosition: totalCount > 3 ? 'top' : 'bottom',
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
            selectBoxPosition: totalCount > 3 ? 'top' : 'bottom',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ActivityScoreList;
