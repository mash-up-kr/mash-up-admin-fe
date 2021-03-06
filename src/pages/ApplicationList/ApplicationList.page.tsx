import React, {
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  FormEvent,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { writeFileXLSX } from 'xlsx';
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import dayjs from 'dayjs';
import * as api from '@/api';
import {
  BottomCTA,
  Button,
  Pagination,
  SearchOptionBar,
  Table,
  TeamNavigationTabs,
} from '@/components';
import { formatDate, uniqArray } from '@/utils';
import { PATH, SORT_TYPE } from '@/constants';
import { $applications, $teamIdByName, ModalKey, $modalByStorage, $profile } from '@/store';
import { useConvertToXlsx, useDirty, usePagination } from '@/hooks';
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
import { ApplicationFilterValuesType } from '@/components/common/SearchOptionBar/SearchOptionBar.component';

const APPLICATION_EXTRA_SIZE = 100;

const ApplicationList = () => {
  const handleSMSModal = useSetRecoilState($modalByStorage(ModalKey.smsSendModalDialog));
  const handleResultModal = useSetRecoilState($modalByStorage(ModalKey.changeResultModalDialog));

  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const teamId = useRecoilValue($teamIdByName(teamName));
  const myTeamName = useRecoilValue($profile)[0];
  const isMyTeam = useMemo(
    () =>
      !teamName ||
      teamName.toLowerCase() === myTeamName.toLowerCase() ||
      myTeamName === 'BRANDING' ||
      myTeamName === 'MASHUP',
    [myTeamName, teamName],
  );

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

  const [searchWord, setSearchWord] = useState<{ value: string }>({ value: '' });
  const [filterValues, setFilterValues] = useState<ApplicationFilterValuesType>({
    confirmStatus: { label: '', value: '' },
    resultStatus: { label: '', value: '' },
  });

  const [sortTypes, setSortTypes] = useState<SortType<ApplicationResponse>[]>([
    { accessor: 'applicant.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'submittedAt', type: SORT_TYPE.DEFAULT },
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
      confirmStatus: filterValues?.confirmStatus?.value,
      resultStatus: filterValues?.resultStatus?.value,
      sort: sortParam,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, size, teamId, searchWord, sortParam, filterValues],
  );

  const [totalCount, setTotalCount] = useState(0);
  const [{ state, contents: tableRows }] = useRecoilStateLoadable($applications(applicationParams));
  const [{ contents: entireTableRows }] = useRecoilStateLoadable(
    $applications({
      page: 0,
      teamId: parseInt(teamId, 10) || undefined,
      size: (tableRows?.page?.totalCount || 0) + APPLICATION_EXTRA_SIZE,
    }),
  );
  const refreshApplications = useRecoilRefresher_UNSTABLE($applications(applicationParams));
  const [selectedRows, setSelectedRows] = useState<ApplicationResponse[]>([]);
  const selectedResults = useMemo(
    () =>
      uniqArray(selectedRows.map((row) => row.result.status)) as ApplicationResultStatusKeyType[],
    [selectedRows],
  );

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<ApplicationResponse[]>(
    tableRows.data || [],
  );

  const { workBook } = useConvertToXlsx<ApplicationResponse>({
    workSheet: entireTableRows?.data?.map((each: ApplicationResponse) => ({
      ??????: each.applicant.name,
      ????????????: each.applicant.phoneNumber,
      ???????????????: each.team.name,
      ????????????: each.submittedAt
        ? formatDate(each.submittedAt, 'YYYY??? M??? D???(ddd) a hh??? mm???')
        : '',
      ????????????: each.result.interviewStartedAt
        ? formatDate(each.result.interviewStartedAt, 'YYYY??? M??? D???(ddd) a hh??? mm???')
        : '',
      ?????????????????????: ApplicationConfirmationStatus[each.confirmationStatus],
      ????????????: ApplicationResultStatus[each.result.status],
    })),
    teamName: teamName || '??????',
    isLoading,
  });

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: tableRows.page?.totalCount,
  });

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
          teamId: parseInt(teamId, 10) || undefined,
        });
        setSelectedRows(applications.data);
        if (applications.page) {
          setTotalCount(applications.page.totalCount);
        }
      }
    },
    [tableRows.page?.totalCount, teamId],
  );

  const columns: TableColumn<ApplicationResponse>[] = [
    {
      title: '??????',
      accessor: 'applicant.name',
      idAccessor: 'applicationId',
      widthRatio: '10%',
      renderCustomCell: (cellValue, id, handleClickLink, applicationParamStates) => (
        <Styled.FormTitleWrapper title={cellValue as string}>
          <Styled.FormTitle>{cellValue as string}</Styled.FormTitle>
          {handleClickLink ? (
            <Styled.TitleButton type="button" onClick={handleClickLink} />
          ) : (
            <Styled.TitleLink
              to={`${PATH.APPLICATION}/${id}`}
              state={{ ...applicationParamStates, from: `${pathname}${search}` }}
            />
          )}
        </Styled.FormTitleWrapper>
      ),
    },
    {
      title: '????????????',
      accessor: 'applicant.phoneNumber',
      widthRatio: '14%',
    },
    {
      title: '???????????????',
      accessor: 'team.name',
      widthRatio: '8%',
    },
    {
      title: '????????????',
      accessor: 'submittedAt',
      widthRatio: '21%',
      renderCustomCell: (cellValue) =>
        cellValue ? formatDate(cellValue as string, 'YYYY??? M??? D??? A h??? m???') : '-',
    },
    {
      title: '????????????',
      accessor: 'result.interviewStartedAt',
      widthRatio: '21%',
      renderCustomCell: (cellValue) =>
        cellValue ? formatDate(cellValue as string, 'YYYY??? M??? D??? A h??? m???') : '-',
    },
    {
      title: '?????????????????????',
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
      title: '????????????',
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
    if (isDirty && !isLoading) {
      window.scrollTo(0, 179);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTableRows]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>????????? ??????</Styled.Heading>
      <Styled.StickyContainer>
        <TeamNavigationTabs />
        <SearchOptionBar
          placeholder="??????, ???????????? ??????"
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          searchWord={searchWord}
          handleSubmit={handleSearch}
        />
      </Styled.StickyContainer>
      <Table
        prefix="application"
        topStickyHeight={14.1}
        columns={columns}
        rows={loadedTableRows}
        isLoading={isLoading}
        supportBar={{
          totalCount,
          totalSummaryText: '??? ????????????',
          selectedSummaryText: '??? ??????',
          buttons: [
            <Styled.DisabledButton
              $size={ButtonSize.xs}
              shape={ButtonShape.defaultLine}
              onClick={() =>
                handleSMSModal({
                  key: ModalKey.smsSendModalDialog,
                  props: {
                    selectedApplications: selectedRows,
                    showSummary: true,
                  },
                  isOpen: true,
                })
              }
              disabled={selectedResults.length === 0 && isMyTeam}
            >
              SMS ??????
            </Styled.DisabledButton>,
            <Styled.DisabledButton
              $size={ButtonSize.xs}
              shape={ButtonShape.defaultLine}
              onClick={() =>
                handleResultModal({
                  key: ModalKey.changeResultModalDialog,
                  props: {
                    selectedList: selectedRows.map((row) => row.applicationId),
                    selectedResults,
                    refreshList: () => {
                      refreshApplications();
                      setSelectedRows([]);
                    },
                  },
                  isOpen: true,
                })
              }
              disabled={selectedResults.length === 0 && isMyTeam}
            >
              ?????? ?????? ??????
            </Styled.DisabledButton>,
            <Button
              $size={ButtonSize.xs}
              shape={ButtonShape.defaultLine}
              onClick={() =>
                writeFileXLSX(
                  workBook,
                  `${formatDate(dayjs().format(), 'YYYY??? M??? D???(ddd)')}-${
                    teamName || '??????'
                  }.xlsx`,
                )
              }
              disabled={!loadedTableRows}
            >
              Export to Excel
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
            selectableSize={{
              selectBoxPosition: loadedTableRows.length > 3 ? 'top' : 'bottom',
              handleChangeSize,
            }}
            handleChangePage={handleChangePage}
          />
        }
        applicationParams={applicationParams}
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
            selectBoxPosition: loadedTableRows.length > 3 ? 'top' : 'bottom',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ApplicationList;
