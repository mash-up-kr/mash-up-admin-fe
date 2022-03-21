import React, { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalWrapper, Pagination, Table } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';
import { SORT_TYPE } from '@/constants';
import { usePagination } from '@/hooks';
import * as Styled from './SmsSendDetailListModalDialog.styled';

const columns: TableColumn<ApplicationResponse>[] = [
  {
    title: '이름',
    accessor: 'applicant.name',
    idAccessor: 'applicationId',
    widthRatio: '30%',
  },
  {
    title: '전화번호',
    accessor: 'applicant.phoneNumber',
    widthRatio: '40%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team.name',
    widthRatio: '30%',
  },
];

export interface SmsSendDetailListModalDialogProps {
  selectedApplications: ApplicationResponse[];
}

const SmsSendDetailListModalDialog = ({
  selectedApplications,
}: SmsSendDetailListModalDialogProps) => {
  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendDetailListModalDialog), {
      key: ModalKey.smsSendDetailListModalDialog,
      isOpen: false,
    });
  });

  const modalProps = {
    heading: '발송인원 상세 리스트',
    footer: {
      cancelButton: {
        label: '닫기',
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    isContentScroll: false,
  };

  const { pageOptions, handleChangePage } = usePagination({
    totalCount: 80, // selectedApplications.length,
    pagingSize: 10,
    pageButtonsSize: 7,
    usingSearchParams: false,
  });

  const [sortTypes, setSortTypes] = useState<SortType<ApplicationResponse>[]>([
    { accessor: 'applicant.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'team.name', type: SORT_TYPE.DEFAULT },
  ]);

  return (
    <ModalWrapper {...modalProps}>
      <Styled.TableWrapper>
        <Table
          prefix="application-sms"
          width={60}
          maxHeight={57}
          columns={columns}
          rows={selectedApplications}
          supportBar={{
            totalCount: selectedApplications.length,
            totalSummaryText: '총 발송인원',
          }}
          sortOptions={{
            sortTypes,
            disableMultiSort: true,
            handleSortColumn: (_sortTypes) => {
              setSortTypes(_sortTypes);
            },
          }}
          pagination={<Pagination pageOptions={pageOptions} handleChangePage={handleChangePage} />}
        />
      </Styled.TableWrapper>
    </ModalWrapper>
  );
};

export default SmsSendDetailListModalDialog;
