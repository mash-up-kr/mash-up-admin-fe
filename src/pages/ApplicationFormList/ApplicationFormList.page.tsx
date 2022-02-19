import React, { useEffect, useState } from 'react';
import { useRecoilStateLoadable } from 'recoil';
import dayjs from 'dayjs';
import { usePagination } from '@/hooks';
import { Pagination, Table } from '@/components';
import { ApplicationFormResponse } from '@/types';
import { TableColumn } from '@/components/common/Table/Table.component';
import { $applicationForms } from '@/store';

const ApplicationFormList = () => {
  const columns: TableColumn<ApplicationFormResponse>[] = [
    {
      title: '플랫폼',
      accessor: 'team.name',
      widthRatio: '10%',
    },
    {
      title: '지원서 설문지 문서명',
      accessor: 'name',
      widthRatio: '25%',
    },
    {
      title: '작성자',
      accessor: 'createdBy',
      widthRatio: '10%',
    },
    {
      title: '작성일시',
      accessor: 'createdAt',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => (
        <span>{dayjs(cellValue as string).format('YYYY년 M월 DD일 오후 h시 m분')}</span>
      ),
    },
    {
      title: '수정일시',
      accessor: 'updatedAt',
      widthRatio: '20%',
      renderCustomCell: (cellValue) => (
        <span>{dayjs(cellValue as string).format('YYYY년 M월 DD일 오후 h시 m분')}</span>
      ),
    },
    {
      title: '미리보기',
      renderCustomCell: () => <div>icon</div>,
      widthRatio: '5%',
    },
  ];

  const [totalCount, setTotalCount] = useState(1);
  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(totalCount);
  const [{ state, contents }] = useRecoilStateLoadable(
    $applicationForms({
      page: pageOptions.currentPage - 1,
      size: pageOptions.pagingSize,
    }),
  );

  useEffect(() => {
    setTotalCount(contents.length);
  }, [contents]);

  return (
    <div>
      {state === 'hasValue' && (
        <Table<ApplicationFormResponse>
          prefix="application"
          columns={columns}
          rows={contents}
          isLoading={false}
        />
      )}

      <Pagination
        pageOptions={pageOptions}
        selectableSize
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />
    </div>
  );
};

export default ApplicationFormList;
