import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { useLocation, useSearchParams } from 'react-router-dom';

import Preview from '@/assets/svg/preview-20.svg';

import {
  TeamNavigationTabs,
  Button,
  Pagination,
  Table,
  Link,
  UserProfile,
  SearchOptionBar,
  BottomCTA,
} from '@/components';
import { useDirty, usePagination, useToggleState } from '@/hooks';
import { $applicationForms, $generationNumber, $teamIdByName } from '@/store';
import { ApplicationFormResponse, Question, ApplicationFormRequest } from '@/types';
import { PATH, SORT_TYPE } from '@/constants';
import { formatDate } from '@/utils';
import { TableColumn, SortType } from '@/components/common/Table/Table.component';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { ApplicationFormPreviewModal } from '@/components/ApplicationForm/ApplicationFormPreview/ApplicationFormPreview.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';

import * as Styled from './ApplicationFormList.styled';

const ApplicationFormPreview = ({ questions }: { questions: Question[] }) => {
  const [modalOpened, toggleModalOpened] = useToggleState(false);

  return (
    <>
      <Styled.Center>
        <Button Icon={Preview} shape={ButtonShape.smallIcon} onClick={toggleModalOpened} />
      </Styled.Center>
      {modalOpened && (
        <ApplicationFormPreviewModal questions={questions} toggleModalOpened={toggleModalOpened} />
      )}
    </>
  );
};

const ApplicationFormList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const teamId = useRecoilValue($teamIdByName(teamName));
  const generationNumber = useRecoilValue($generationNumber);

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';
  const searchWord = searchParams.get('searchWord') || '';

  const { pathname, search } = useLocation();

  const [sortTypes, setSortTypes] = useState<SortType<ApplicationFormResponse>[]>([
    { accessor: 'team.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'name', type: SORT_TYPE.DEFAULT },
    { accessor: 'createdAt', type: SORT_TYPE.DEFAULT },
    { accessor: 'updatedAt', type: SORT_TYPE.DEFAULT },
  ]);
  const sortParam = useMemo(() => {
    const matched = sortTypes.find((sortType) => sortType.type !== SORT_TYPE.DEFAULT);
    if (!matched) return '';

    const { accessor, type } = matched;
    return `${accessor},${type}`;
  }, [sortTypes]);

  const applicationFormParams = useMemo<ApplicationFormRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      teamId: parseInt(teamId, 10) || undefined,
      searchWord,
      sort: sortParam,
      generationNumber,
    }),
    [page, size, teamId, searchWord, sortParam, generationNumber],
  );

  const [totalCount, setTotalCount] = useState(0);
  const [{ state, contents: tableRows }] = useRecoilStateLoadable(
    $applicationForms(applicationFormParams),
  );

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<ApplicationFormResponse[]>(
    tableRows.data || [],
  );

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: tableRows.page?.totalCount,
  });

  const { makeDirty, isDirty } = useDirty(1);

  const columns: TableColumn<ApplicationFormResponse>[] = [
    {
      title: '플랫폼',
      accessor: 'team.name',
      widthRatio: '9%',
    },
    {
      title: '지원서 설문지 문서명',
      accessor: 'name',
      idAccessor: 'applicationFormId',
      widthRatio: '28%',
      renderCustomCell: ({ cellValue, id }) => (
        <Styled.FormTitleWrapper title={cellValue as string}>
          <Styled.FormTitle>{cellValue as string}</Styled.FormTitle>
          <Styled.TitleLink
            to={`${PATH.APPLICATION_FORM}/${id}`}
            state={{ from: `${pathname}${search}` }}
          />
        </Styled.FormTitleWrapper>
      ),
    },
    {
      title: '작성자',
      accessor: 'createdBy',
      widthRatio: '14%',
      renderCustomCell: ({ cellValue }) => {
        const [team, role] = (cellValue as string).split('_') as [TeamType, RoleType];
        return (
          <Styled.CustomUserProfile>
            <UserProfile team={team} role={role} showBackground={false} />
          </Styled.CustomUserProfile>
        );
      },
    },
    {
      title: '작성일시',
      accessor: 'createdAt',
      widthRatio: '21%',
      renderCustomCell: ({ cellValue }) =>
        formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '수정일시',
      accessor: 'updatedAt',
      widthRatio: '21%',
      renderCustomCell: ({ cellValue }) =>
        formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
    },
    {
      title: '미리보기',
      accessor: 'questions',
      renderCustomCell: ({ cellValue }) => (
        <ApplicationFormPreview questions={cellValue as Question[]} />
      ),
      widthRatio: '7%',
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setLoadedTableRows(tableRows.data);
      setTotalCount(tableRows.page.totalCount);
      makeDirty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, tableRows]);

  useEffect(() => {
    searchParams.delete('searchWord');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamName]);

  useLayoutEffect(() => {
    if (isDirty && !isLoading) {
      window.scrollTo({ top: 179, left: 0, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTableRows]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>지원서 설문지 내역</Styled.Heading>
      <Styled.StickyContainer>
        <TeamNavigationTabs />
        <SearchOptionBar placeholder="지원서 설문지 문서명 검색" />
      </Styled.StickyContainer>
      <Table
        prefix="application-form"
        topStickyHeight={14.1}
        columns={columns}
        rows={loadedTableRows}
        isLoading={isLoading}
        supportBar={{
          totalCount,
          totalSummaryText: '총 지원설문지',
          buttons: [
            <Link to={PATH.APPLICATION_FORM_CREATE}>
              <Button $size={ButtonSize.xs} shape={ButtonShape.primary}>
                지원서 설문지 작성
              </Button>
            </Link>,
          ],
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
            selectableSize={{
              selectBoxPosition: loadedTableRows.length > 3 ? 'top' : 'bottom',
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
            selectBoxPosition: loadedTableRows.length > 3 ? 'top' : 'bottom',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ApplicationFormList;
