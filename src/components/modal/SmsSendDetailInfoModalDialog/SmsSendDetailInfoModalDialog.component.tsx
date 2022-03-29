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
import { SmsResponse, SmsContent, KeyOf } from '@/types';
import { formatDate, getOwnValueByKey, sortString } from '@/utils';
import { usePagination } from '@/hooks';
import { SORT_TYPE } from '@/constants';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import * as Styled from './SmsSendDetailInfoModalDialog.styled';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';

const SMS_STATUS = {
  CREATED: '생성',
  SUCCESS: '성공',
  FAILURE: '실패',
} as const;

const columns: TableColumn<SmsContent>[] = [
  {
    title: '이름',
    accessor: 'recipientName',
    widthRatio: '25%',
  },
  {
    title: '전화번호',
    accessor: 'recipientPhoneNumber',
    widthRatio: '30%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team.name',
    widthRatio: '25%',
  },
  {
    title: '발송여부',
    accessor: 'status',
    widthRatio: '20%',
    renderCustomCell: (cellValue) => (
      <Styled.StatusWrapper status={cellValue as string}>
        {SMS_STATUS[cellValue as KeyOf<typeof SMS_STATUS>]}
      </Styled.StatusWrapper>
    ),
  },
];

export interface SmsSendDetailInfoModalDialogProps {
  sms: SmsResponse;
}

const SmsSendDetailInfoModalDialog = ({ sms }: SmsSendDetailInfoModalDialogProps) => {
  const [team, role] = sms.sender.split('_') as [TeamType, RoleType];

  const { pageOptions, handleChangePage } = usePagination({
    totalCount: sms.smsRequests.length,
    pagingSize: 10,
    pageButtonsSize: 7,
    usingSearchParams: false,
  });

  const [tableRows, setTableRows] = useState(sms.smsRequests);
  const pagedRows = useMemo(() => {
    const startIndex = 10 * (pageOptions.currentPage - 1);
    const endIndex = startIndex + 10;
    return tableRows.slice(startIndex, endIndex);
  }, [tableRows, pageOptions]);

  const [sortTypes, setSortTypes] = useState<SortType<SmsContent>[]>([
    { accessor: 'recipientName', type: SORT_TYPE.DEFAULT },
    { accessor: 'team.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'status', type: SORT_TYPE.DEFAULT },
  ]);

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendDetailInfoModalDialog), {
      key: ModalKey.smsSendDetailInfoModalDialog,
      isOpen: false,
    });
  });

  const handleSMSModal = useRecoilCallback(({ set }) => (_sms: SmsResponse) => {
    set($modalByStorage(ModalKey.smsSendModalDialog), {
      key: ModalKey.smsSendModalDialog,
      props: {
        selectedApplications: [],
        messageContent: _sms.content,
        isSendFailed: true,
      },
      isOpen: true,
    });
  });

  const props = {
    heading: 'SMS 발송 상세내역',
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
          <TitleWithContent title="발송메모">{sms.name}</TitleWithContent>
          <TitleWithContent title="발송번호">{sms.senderPhoneNumber}</TitleWithContent>
          <TitleWithContent title="발송자">
            <Styled.CustomUserProfile>
              <UserProfile team={team} role={role} showBackground={false} removePadding />
            </Styled.CustomUserProfile>
          </TitleWithContent>
          <TitleWithContent title="발송일시">
            {sms.sentAt ? formatDate(sms.sentAt, 'YYYY년 M월 D일 A h시 m분') : '-'}
          </TitleWithContent>
          <TitleWithContent title="발송여부">
            <Styled.SendingStatus>
              <span>{sms.successCount}</span>/<span>{sms.failureCount}</span>/
              <span>{sms.totalCount}</span>
            </Styled.SendingStatus>
          </TitleWithContent>
          <Styled.ContentWrapper>
            <TitleWithContent title="발송상세내용">{sms.content}</TitleWithContent>
          </Styled.ContentWrapper>
        </Styled.DetailWrapper>
        <Styled.TableWrapper>
          <Table<SmsContent>
            prefix="sms"
            columns={columns}
            rows={pagedRows}
            supportBar={{
              totalSummaryText: ' ',
              buttons: [
                <Button
                  $size={ButtonSize.xs}
                  shape={ButtonShape.primary}
                  onClick={() => handleSMSModal(sms)}
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
                  setTableRows(sms.smsRequests);
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

export default SmsSendDetailInfoModalDialog;
