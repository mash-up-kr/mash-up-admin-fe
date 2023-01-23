import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useRecoilCallback, useRecoilStateLoadable } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { Pagination, Table, UserProfile, SearchOptionBar, BottomCTA } from '@/components';
import { useDirty, usePagination } from '@/hooks';
import { $modalByStorage, $emailSendingList, ModalKey } from '@/store';
import { SORT_TYPE } from '@/constants';
import { formatDate } from '@/utils';
import * as api from '@/api';
import { TableColumn, SortType } from '@/components/common/Table/Table.component';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';

import * as Styled from './EmailSendingList.styled';
import {
  EmailResponse,
  EmailSendingListResponse,
  EmailSendingListRequest,
  EmailTypes,
  EmailType,
  NestedKeyOf,
} from '@/types';

const changeParamForBackend = (sortParam: NestedKeyOf<EmailSendingListResponse>) => {
  switch (sortParam) {
    case 'type':
      return 'templateName';
    case 'sendAt':
      return 'createdAt';
    default:
      return sortParam;
  }
};

const EmailSendingList = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';
  const searchWord = searchParams.get('searchWord') || '';

  const [sortTypes, setSortTypes] = useState<SortType<EmailSendingListResponse>[]>([
    { accessor: 'type', type: SORT_TYPE.DEFAULT },
    { accessor: 'sendAt', type: SORT_TYPE.DEFAULT },
  ]);

  const sortParam = useMemo(() => {
    const matched = sortTypes.find((sortType) => sortType.type !== SORT_TYPE.DEFAULT);
    if (!matched) return '';

    const { accessor, type } = matched;
    return `${changeParamForBackend(accessor)},${type}`;
  }, [sortTypes]);

  const emailSendingListParams = useMemo<EmailSendingListRequest>(
    () => ({
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      searchWord,
      sort: sortParam,
    }),
    [page, size, searchWord, sortParam],
  );

  const [{ state, contents: tableRows }] = useRecoilStateLoadable(
    $emailSendingList(emailSendingListParams),
  );

  const handleEmailModal = useRecoilCallback(({ set }) => (email: EmailResponse) => {
    set($modalByStorage(ModalKey.emailSendDetailInfoModalDialog), {
      key: ModalKey.emailSendDetailInfoModalDialog,
      props: { email },
      isOpen: true,
    });
  });

  const columns: TableColumn<EmailSendingListResponse>[] = useMemo(
    () => [
      {
        title: '발송메모',
        accessor: 'name',
        idAccessor: 'emailNotificationId',
        widthRatio: '35%',
        renderCustomCell: (cellValue, id) => (
          <Styled.TitleButton
            onClick={async () => {
              const { data: email } = await api.getEmailById({ notificationId: id });

              handleEmailModal(email);
            }}
          >
            {cellValue as string}
          </Styled.TitleButton>
        ),
      },
      {
        title: '발송유형',
        accessor: 'type',
        widthRatio: '15%',
        renderCustomCell: (cellValue) => EmailTypes[cellValue as EmailType],
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
        accessor: 'sendAt',
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
    [handleEmailModal],
  );

  const [totalCount, setTotalCount] = useState(0);

  const isLoading = state === 'loading';
  const [loadedTableRows, setLoadedTableRows] = useState<EmailSendingListResponse[]>(
    tableRows.data || [],
  );

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: tableRows.page?.totalCount,
  });

  const { makeDirty, isDirty } = useDirty(1);

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
      window.scrollTo({ top: 167, left: 0, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTableRows]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>이메일 발송 내역</Styled.Heading>
      <Styled.StickyContainer>
        <SearchOptionBar placeholder="발송유형, 발송자, 발송메모 검색" />
      </Styled.StickyContainer>
      <Table
        prefix="email"
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

export default EmailSendingList;
