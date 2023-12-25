import React, { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { BottomCTA, Pagination, SearchOptionBar, Table, TeamNavigationTabs } from '@/components';
import * as Styled from './ActivityScoreList.styled';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { PATH, SORT_TYPE } from '@/constants';
import { usePagination } from '@/hooks';
import { $generationNumber } from '@/store';
import { MemberRequest, MemberResponse, MemberStatusKeys } from '@/types';
import { $members } from '@/store/member';
import MemberStatusBadge from '@/components/ActivityScore/MemberStatusBadge/MemberStatusBadge.component';
import * as api from '@/api';

const ActivityScoreList = () => {
  const [searchParams] = useSearchParams();
  const generationNumber = useRecoilValue($generationNumber);
  const [selectedRows, setSelectedRows] = useState<MemberResponse[]>([]);

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

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
    pagingSize: 20,
  });

  const columns: TableColumn<MemberResponse>[] = [
    {
      title: '이름',
      widthRatio: '25%',
      accessor: 'name',
      idAccessor: 'memberId',
      renderCustomCell: ({ cellValue, id, handleClickLink }) => (
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
    {
      title: '활동 상태',
      widthRatio: '20%',
      accessor: 'memberStatus',
      renderCustomCell: ({ cellValue }) => (
        <MemberStatusBadge text={cellValue as MemberStatusKeys} />
      ),
    },
  ];

  const handleSelectAll = async (checkedValue: boolean) => {
    if (checkedValue) {
      setSelectedRows([]);
      return;
    }
    const newMemberParams = { ...membersParams, size: totalCount };
    const allMemberContents = await api.getMembers(newMemberParams);
    setSelectedRows(allMemberContents.data);
  };

  return (
    <Styled.PageWrapper>
      <Styled.Heading>활동점수</Styled.Heading>
      <Styled.StickyContainer>
        <TeamNavigationTabs />
        <SearchOptionBar placeholder="이름 검색" />
      </Styled.StickyContainer>
      <Table<MemberResponse>
        prefix="activity-score"
        topStickyHeight={14.1}
        columns={columns}
        rows={tableRows}
        supportBar={{ totalSummaryText: '총 인원', totalCount, selectedSummaryText: '명 선택' }}
        sortOptions={{
          sortTypes,
          disableMultiSort: true,
          handleSortColumn: (_sortTypes) => {
            setSortTypes(_sortTypes);
          },
        }}
        selectableRow={{
          selectedCount: selectedRows.length,
          selectedRows,
          setSelectedRows,
          handleSelectAll,
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
