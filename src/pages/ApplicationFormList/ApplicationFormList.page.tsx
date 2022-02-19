import React from 'react';
import { useRecoilStateLoadable } from 'recoil';
import { usePagination } from '@/hooks';
import { Pagination, Table } from '@/components';
import { ApplicationFormResponse } from '@/types';
import { TableColumn } from '@/components/common/Table/Table.component';
import { $applicationForms } from '@/store';

const ApplicationFormList = () => {
  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(550);

  const columns: TableColumn<ApplicationFormResponse>[] = [
    // {
    //   title: '이름',
    //   accessor: 'name',
    //   renderCustomCell: (cellValue) => <div style={{ color: 'red' }}>{cellValue} asdasd</div>,
    // },
    {
      title: '플랫폼',
      accessor: 'team.name',
    },
    {
      title: '지원서 설문지 문서명',
      accessor: 'name',
    },
    {
      title: '작성자',
      accessor: 'createdBy',
    },
    {
      title: '작성일시',
      accessor: 'createdAt',
    },
    {
      title: '수정일시',
      accessor: 'updatedAt',
    },
    {
      title: '미리보기',
      renderCustomCell: () => <div>미리보기</div>,
    },
  ];

  const [{ state, contents }] = useRecoilStateLoadable($applicationForms({}));
  console.log(contents);

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
