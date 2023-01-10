import React, { useMemo, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalWrapper, Pagination, Table } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';
import { SORT_TYPE } from '@/constants';
import { usePagination } from '@/hooks';
import { SortType, TableColumn } from '@/components/common/Table/Table.component';
import { ApplicationResponse } from '@/types';
import * as Styled from './EmailSendDetailListModalDialog.styled';
import { getOwnValueByKey } from '@/utils';
import { sortString } from '../../../utils/string';

const columns: TableColumn<ApplicationResponse>[] = [
  {
    title: '이름',
    accessor: 'applicant.name',
    idAccessor: 'applicationId',
    widthRatio: '30%',
  },
  {
    title: '이메일',
    accessor: 'applicant.email',
    widthRatio: '40%',
  },
  {
    title: '지원플랫폼',
    accessor: 'team.name',
    widthRatio: '30%',
  },
];

export interface EmailSendDetailListModalDialogProps {
  selectedApplications: ApplicationResponse[];
}

const EmailSendDetailListModalDialog = ({
  selectedApplications,
}: EmailSendDetailListModalDialogProps) => {
  const { pageOptions, handleChangePage } = usePagination({
    totalCount: selectedApplications.length,
    pagingSize: 10,
    pageButtonsSize: 7,
    usingSearchParams: false,
  });

  const [tableRows, setTableRows] = useState(selectedApplications);
  const pagedRows = useMemo(() => {
    const startIndex = 10 * (pageOptions.currentPage - 1);
    const endIndex = startIndex + 10;
    return tableRows.slice(startIndex, endIndex);
  }, [tableRows, pageOptions]);

  const [sortTypes, setSortTypes] = useState<SortType<ApplicationResponse>[]>([
    { accessor: 'applicant.name', type: SORT_TYPE.DEFAULT },
    { accessor: 'team.name', type: SORT_TYPE.DEFAULT },
  ]);

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.emailSendDetailListModalDialog), {
      key: ModalKey.emailSendDetailListModalDialog,
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
    closeOnClickOverlay: false,
  };

  return (
    <ModalWrapper {...modalProps}>
      <Styled.TableWrapper>
        <Table<ApplicationResponse>
          prefix="application-email"
          columns={columns}
          rows={pagedRows}
          supportBar={{
            totalCount: selectedApplications.length,
            totalSummaryText: '총 발송인원',
          }}
          sortOptions={{
            sortTypes,
            disableMultiSort: true,
            handleSortColumn: (_sortTypes) => {
              const pivotColumn = _sortTypes.find(
                (sortType) => sortType.type !== SORT_TYPE.DEFAULT,
              );
              if (!pivotColumn) {
                setTableRows(selectedApplications);
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
          pagination={<Pagination pageOptions={pageOptions} handleChangePage={handleChangePage} />}
        />
      </Styled.TableWrapper>
    </ModalWrapper>
  );
};

export default EmailSendDetailListModalDialog;
