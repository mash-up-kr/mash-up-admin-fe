import React, { FormEvent, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useRecoilCallback, useRecoilStateLoadable } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { Pagination, Table, UserProfile, SearchOptionBar, BottomCTA } from '@/components';
import { useDirty, usePagination } from '@/hooks';
import { $modalByStorage, $smsSendingList, ModalKey } from '@/store';
import { SORT_TYPE } from '@/constants';
import { formatDate } from '@/utils';
import * as api from '@/api';
import { TableColumn, SortType } from '@/components/common/Table/Table.component';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';

import * as Styled from './SmsSendingList.styled';
import { SmsResponse, SmsSendingListRequest, SmsSendingListResponse } from '@/types/dto/sms';
import { scrollTo } from '@/utils/scroll';

const ApplicationFormList = () => {
  const handleSMSModal = useRecoilCallback(({ set }) => (sms: SmsResponse) => {
    set($modalByStorage(ModalKey.smsSendDetailInfoModalDialog), {
      key: ModalKey.smsSendDetailInfoModalDialog,
      props: { sms },
      isOpen: true,
    });
  });

  const columns: TableColumn<SmsSendingListResponse>[] = useMemo(
    () => [
      {
        title: '발송메모',
        accessor: 'name',
        idAccessor: 'notificationId',
        widthRatio: '35%',
        renderCustomCell: (cellValue, id) => (
          <Styled.TitleButton
            onClick={async () => {
              const { data: sms } = await api.getSmsById({ notificationId: id as string });

              handleSMSModal(sms);
            }}
          >
            {cellValue as string}
          </Styled.TitleButton>
        ),
      },
      {
        title: '발송번호',
        accessor: 'senderPhoneNumber',
        widthRatio: '15%',
      },
      {
        title: '발송자',
        accessor: 'sender',
        widthRatio: '15%',
        renderCustomCell: (cellValue) => {
          const [team, role] = (cellValue as string).split('_') as [TeamType, RoleType];
          return (
            <Styled.CustomUserProfile>
              <UserProfile team={team} role={role} showBackground={false} />
            </Styled.CustomUserProfile>
          );
        },
      },
      {
        title: '발송일시',
        accessor: 'sentAt',
        widthRatio: '20%',
        renderCustomCell: (cellValue) =>
          formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
      },
      {
        title: '발송여부\n(성공/실패/전체)',
        accessor: ['successCount', 'failureCount', 'totalCount'],
        widthRatio: '10%',
        renderCustomCell: (cellValue) => {
          const [successCount, failureCount, totalCount] = cellValue as string[];
          return (
            <Styled.SendingStatus>
              <span>{successCount}</span>/<span>{failureCount}</span>/<span>{totalCount}</span>
            </Styled.SendingStatus>
          );
        },
      },
    ],
    [handleSMSModal],
  );

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

  const [searchWord, setSearchWord] = useState<{ value: string }>({ value: '' });

  const [sortTypes, setSortTypes] = useState<SortType<SmsSendingListResponse>[]>([
    { accessor: 'senderPhoneNumber', type: SORT_TYPE.DEFAULT },
    { accessor: 'sentAt', type: SORT_TYPE.DEFAULT },
  ]);
  const sortParam = useMemo(() => {
    const matched = sortTypes.find((sortType) => sortType.type !== SORT_TYPE.DEFAULT);
    if (!matched) return '';

    const { accessor, type } = matched;
    return `${accessor},${type}`;
  }, [sortTypes]);

  const smsSendingListParams = useMemo<SmsSendingListRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      searchWord: searchWord.value,
      sort: sortParam,
    }),
    [page, size, searchWord, sortParam],
  );

  const [totalCount, setTotalCount] = useState(0);
  const [{ state, contents: tableRows }] = useRecoilStateLoadable(
    $smsSendingList(smsSendingListParams),
  );

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<SmsSendingListResponse[]>(
    tableRows.data || [],
  );

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: tableRows.page?.totalCount,
  });

  const { makeDirty, isDirty } = useDirty(1);

  const handleSubmit = (
    e: { target: { searchWord: { value: string } } } & FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setSearchWord({ value: e.target.searchWord.value });
  };

  useEffect(() => {
    if (!isLoading) {
      setLoadedTableRows(tableRows.data);
      setTotalCount(tableRows.page.totalCount);
      makeDirty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, tableRows]);

  useLayoutEffect(() => {
    if (isDirty && !isLoading) {
      scrollTo(0, 167, { useAnimation: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTableRows]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>SMS 발송 내역</Styled.Heading>
      <Styled.StickyContainer>
        <SearchOptionBar
          placeholder="발송번호, 발송자, 발송메모 검색"
          searchWord={searchWord}
          handleSubmit={handleSubmit}
        />
      </Styled.StickyContainer>
      <Table
        prefix="sms"
        topStickyHeight={9.2}
        columns={columns}
        rows={loadedTableRows}
        isLoading={isLoading}
        supportBar={{
          totalCount,
          totalSummaryText: '총 발송내역',
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
            selectBoxPosition: 'top',
            handleChangeSize,
          }}
          handleChangePage={handleChangePage}
        />
      </BottomCTA>
    </Styled.PageWrapper>
  );
};

export default ApplicationFormList;
