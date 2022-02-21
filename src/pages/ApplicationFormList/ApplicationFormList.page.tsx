import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilStateLoadable, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';

import { useSearchParams } from 'react-router-dom';
import { TeamNavigationTabs, Button, Pagination, Table, Link } from '@/components';
import { usePagination } from '@/hooks';
import { $applicationForms, $teamIdByName } from '@/store';
import { ApplicationFormResponse } from '@/types';
import { TableColumn } from '@/components/common/Table/Table.component';
import * as Styled from './ApplicationFormList.styled';
import { PATH } from '@/constants';

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
  },
  {
    title: '수정일시',
    accessor: 'updatedAt',
    widthRatio: '20%',
  },
  {
    title: '미리보기',
    widthRatio: '5%',
  },
];

const ApplicationFormList = () => {
  const [searchParams] = useSearchParams();
  const teamName = searchParams.get('team');
  const teamId = useRecoilValue($teamIdByName(teamName));

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';

  const params = useMemo(() => {
    return {
      page: parseInt(page, 10) - 1,
      size: parseInt(size, 10),
      teamId: parseInt(teamId, 10) || undefined,
    };
  }, [page, size, teamId]);
  const [{ state, contents }] = useRecoilStateLoadable($applicationForms(params));
  const refreshApplicationForms = useRecoilRefresher_UNSTABLE($applicationForms(params));
  const [tableRows, setTableRows] = useState<ApplicationFormResponse[]>([]);

  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(
    contents.page?.totalCount,
  );

  const isLoading = state === 'loading';

  useEffect(() => {
    if (!isLoading) {
      setTableRows(contents.data);
    }
  }, [isLoading, contents]);

  useEffect(() => {
    refreshApplicationForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>지원서 설문지 내역</Styled.Heading>
      <TeamNavigationTabs />

      <Table<ApplicationFormResponse>
        prefix="application"
        columns={columns}
        rows={tableRows}
        maxHeight={68}
        isLoading={isLoading}
        supportBar={{
          totalCount: contents.page?.totalCount,
          buttons: [
            <Link to={PATH.APPLICATION_FORM_CREATE}>
              <Button $size="xs" shape="primary">
                지원서 설문지 작성
              </Button>
            </Link>,
          ],
        }}
        pagination={
          <Pagination
            pageOptions={pageOptions}
            selectableSize
            selectBoxPosition={tableRows.length > 6 ? 'top' : 'bottom'}
            handleChangePage={handleChangePage}
            handleChangeSize={handleChangeSize}
          />
        }
      />
    </Styled.PageWrapper>
  );
};

export default ApplicationFormList;
