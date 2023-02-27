import React, { useMemo, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import {
  ModalWrapper,
  Pagination,
  Table,
  TitleWithContent,
  UserProfile,
  Button,
} from '@/components';
import { $modalByStorage, ModalKey } from '@/store';
import { EmailResponse, KeyOf, EmailRequest, EmailTypes } from '@/types';
import { formatDate, getOwnValueByKey, sortString } from '@/utils';
import { usePagination } from '@/hooks';
import { SORT_TYPE } from '@/constants';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import * as Styled from './EmailSendDetailInfoModalDialog.styled';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';

const EMAIL_STATUS = {
  CREATED: '생성',
  SUCCESS: '성공',
  FAIL: '실패',
} as const;

const columns: TableColumn<EmailRequest>[] = [
  {
    title: '이름',
    accessor: 'recipientName',
    widthRatio: '20%',
  },
  {
    title: '이메일',
    accessor: 'recipientEmail',
    widthRatio: '35%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team',
    widthRatio: '25%',
  },
  {
    title: '발송여부',
    accessor: 'status',
    widthRatio: '20%',
    renderCustomCell: ({ cellValue }) => (
      <Styled.StatusWrapper status={cellValue as string}>
        {EMAIL_STATUS[cellValue as KeyOf<typeof EMAIL_STATUS>]}
      </Styled.StatusWrapper>
    ),
  },
];

export interface EmailSendDetailInfoModalDialogProps {
  email: EmailResponse;
}

const EmailSendDetailInfoModalDialog = ({ email }: EmailSendDetailInfoModalDialogProps) => {
  const [team, role] = email.sender.split('_') as [TeamType, RoleType];

  const { pageOptions, handleChangePage } = usePagination({
    totalCount: email.emailRequests.length,
    pagingSize: 10,
    pageButtonsSize: 7,
    usingSearchParams: false,
  });

  const [tableRows, setTableRows] = useState(email.emailRequests);

  const pagedRows = useMemo(() => {
    const startIndex = 10 * (pageOptions.currentPage - 1);
    const endIndex = startIndex + 10;
    return tableRows.slice(startIndex, endIndex);
  }, [tableRows, pageOptions]);

  const [sortTypes, setSortTypes] = useState<SortType<EmailRequest>[]>([
    { accessor: 'recipientName', type: SORT_TYPE.DEFAULT },
    { accessor: 'team', type: SORT_TYPE.DEFAULT },
    { accessor: 'status', type: SORT_TYPE.DEFAULT },
  ]);

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.emailSendDetailInfoModalDialog), {
      key: ModalKey.emailSendDetailInfoModalDialog,
      isOpen: false,
    });
  });

  const failedEmailRequests = useMemo(
    () => email.emailRequests.filter(({ status }) => EMAIL_STATUS[status] === EMAIL_STATUS.FAIL),
    [email],
  );

  const handleEmailModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.emailSendModalDialog), {
      key: ModalKey.emailSendModalDialog,
      props: {
        selectedApplications: [],
        isSendFailed: true,
        failedEmailRequests,
      },
      isOpen: true,
    });
  });

  const props = {
    heading: '이메일 발송 상세내역',
    footer: {
      cancelButton: {
        label: '닫기',
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    isContentScroll: false,
    closeOnClickOverlay: false,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.Wrapper>
        <Styled.DetailWrapper>
          <TitleWithContent title="발송메모">{email.name}</TitleWithContent>
          <TitleWithContent title="발송이메일">recruit.mashup@gmail.com</TitleWithContent>
          <TitleWithContent title="발송자">
            <Styled.CustomUserProfile>
              <UserProfile team={team} role={role} showBackground={false} removePadding />
            </Styled.CustomUserProfile>
          </TitleWithContent>
          <TitleWithContent title="발송일시">
            {email.sendAt ? formatDate(email.sendAt, 'YYYY년 M월 D일 A h시 m분') : '-'}
          </TitleWithContent>
          <TitleWithContent title="발송여부(성공/실패/전체)">
            <Styled.SendingStatus>
              <span>{email.successCount}</span>/<span>{email.failureCount}</span>/
              <span>{email.totalCount}</span>
            </Styled.SendingStatus>
          </TitleWithContent>
          <Styled.ContentWrapper>
            <TitleWithContent title="발송유형">{EmailTypes[email.type]}</TitleWithContent>
          </Styled.ContentWrapper>
        </Styled.DetailWrapper>
        <Styled.TableWrapper>
          <Table<EmailRequest>
            prefix="email"
            columns={columns}
            rows={pagedRows}
            supportBar={{
              totalSummaryText: ' ',
              buttons: [
                <Button
                  $size={ButtonSize.xs}
                  shape={ButtonShape.primary}
                  onClick={() => handleEmailModal()}
                >
                  실패인원 재발송
                </Button>,
              ],
            }}
            sortOptions={{
              sortTypes,
              disableMultiSort: true,
              handleSortColumn: (_sortTypes) => {
                const pivotColumn = _sortTypes.find(
                  (sortType) => sortType.type !== SORT_TYPE.DEFAULT,
                );
                if (!pivotColumn) {
                  setTableRows(email.emailRequests);
                } else {
                  setTableRows(
                    [...tableRows].sort((one, another) =>
                      sortString(
                        pivotColumn.type,
                        getOwnValueByKey(one, pivotColumn.accessor),
                        getOwnValueByKey(another, pivotColumn.accessor),
                      ),
                    ),
                  );
                }

                setSortTypes(_sortTypes);
              },
            }}
            pagination={
              <Pagination pageOptions={pageOptions} handleChangePage={handleChangePage} />
            }
          />
        </Styled.TableWrapper>
      </Styled.Wrapper>
    </ModalWrapper>
  );
};

export default EmailSendDetailInfoModalDialog;
