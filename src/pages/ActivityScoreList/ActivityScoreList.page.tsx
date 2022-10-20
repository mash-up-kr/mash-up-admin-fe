import React, { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { BottomCTA, Pagination, SearchOptionBar, Table, TeamNavigationTabs } from '@/components';
import * as Styled from './ActivityScoreList.styled';
import { SearchOptionBarFilter } from '@/components/common/SearchOptionBar/SearchOptionBar.component';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { PATH, SORT_TYPE } from '@/constants';
import { useMyTeam, usePagination } from '@/hooks';
import { $generations } from '@/store';
import { MemberRequest, MemberResponse } from '@/types';
import { $members } from '@/store/member';
import { parseUrlParam } from '@/utils';

const ActivityScoreList = () => {
  const [searchParams] = useSearchParams();
  const generations = useRecoilValue($generations);
  const { isMyTeam } = useMyTeam();

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';
  const generationNumber =
    parseUrlParam(searchParams.get('generation')) || generations?.[0]?.generationNumber;

  const team = searchParams.get('team') || '';
  const searchWord = searchParams.get('searchWord') || '';

  const [sortTypes, setSortTypes] = useState<SortType<MemberResponse>[]>([
    { accessor: 'name', type: SORT_TYPE.DEFAULT },
    { accessor: 'score', type: SORT_TYPE.DEFAULT },
  ]);

  const sortParam = useMemo(() => {
    const matched = sortTypes.find((sortType) => sortType.type !== SORT_TYPE.DEFAULT);
    if (!matched) return '';

    const { accessor, type } = matched;
    return `${accessor},${type}`;
  }, [sortTypes]);

  const filters: SearchOptionBarFilter[] = [
    {
      title: '기수',
      key: 'generation',
      options: generations.map((generation) => ({
        label: `${generation.generationNumber}기`,
        value: generation.generationNumber.toString(),
      })),
    },
  ];

  const { pathname, search } = useLocation();

  const membersParams = useMemo<MemberRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      generationNumber,
      sort: sortParam,
      platform: team,
      searchName: searchWord,
    }),
    [generationNumber, page, size, sortParam, team, searchWord],
  );

  const [{ contents }] = useRecoilStateLoadable($members(membersParams));

  const tableRows = contents.data ?? [];
  const { totalCount = 0 } = contents.page ?? {};

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount,
    pagingSize: 10,
  });

  const columns: TableColumn<MemberResponse>[] = [
    {
      title: '이름',
      widthRatio: '25%',
      accessor: 'name',
      idAccessor: 'memberId',
      renderCustomCell: (cellValue, id, handleClickLink) => (
        <Styled.FormTitleWrapper title={cellValue as string}>
          <Styled.FormTitle>{cellValue as string}</Styled.FormTitle>
          {handleClickLink ? (
            <Styled.TitleButton type="button" onClick={handleClickLink} />
          ) : (
            <Styled.TitleLink
              to={`${PATH.ACTIVITY_SCORE}/${generationNumber}/${id}`}
              state={{ from: `${pathname}${search}` }}
            />
          )}
        </Styled.FormTitleWrapper>
      ),
    },
    {
      title: '아이디',
      widthRatio: '25%',
      accessor: 'identification',
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
        rows={tableRows}
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
        isMyTeam={isMyTeam}
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
