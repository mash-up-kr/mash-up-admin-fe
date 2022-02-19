import React from 'react';
import dayjs from 'dayjs';
import { usePagination } from '@/hooks';
import { Pagination, Table } from '@/components';
import { ApplicationResponse } from '@/types';
import { TableColumn } from '@/components/common/Table/Table.component';

const ApplicationList = () => {
  const { pageOptions, handleChangePage, handleChangeSize } = usePagination(550);

  const columns: TableColumn<ApplicationResponse>[] = [
    {
      title: '이름',
      accessor: 'applicant.name',
      widthRatio: '10%',
    },
    {
      title: '전화번호',
      accessor: 'applicant.phoneNumber',
      widthRatio: '15%',
    },
    {
      title: '지원플랫폼',
      accessor: 'team.name',
      widthRatio: '10%',
    },
    {
      title: '면접 일시',
      accessor: 'result.interviewStartedAt',
      widthRatio: '25%',
      renderCustomCell: (cellValue) => (
        <span>{dayjs(cellValue as string).format('YYYY년 M월 DD일 오후 h시 m분')}</span>
      ),
    },
    {
      title: '사용자확인여부',
      accessor: 'confirmationStatus',
      widthRatio: '25%',
    },
    {
      title: '합격여부',
      accessor: 'result.status',
      widthRatio: '20%',
    },
  ];

  const data: ApplicationResponse[] = [
    {
      applicant: {
        applicantId: 0,
        createdAt: '2022-02-19T10:06:37.439Z',
        email: 'string',
        name: 'string',
        phoneNumber: 'string',
        status: 'ACTIVE',
        updatedAt: '2022-02-19T10:06:37.439Z',
      },
      applicationId: 0,
      confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
      createdAt: '2022-02-19T10:06:37.439Z',
      result: {
        interviewEndedAt: '2022-02-19T10:06:37.439Z',
        interviewStartedAt: '2022-02-19T10:06:37.439Z',
        status: 'INTERVIEW_FAILED',
      },
      team: {
        createdAt: '2022-02-19T10:06:37.439Z',
        createdBy: 'string',
        name: 'string',
        teamId: 0,
        updatedAt: '2022-02-19T10:06:37.439Z',
        updatedBy: 'string',
      },
      updatedAt: '2022-02-19T10:06:37.439Z',
    },
    {
      applicant: {
        applicantId: 0,
        createdAt: '2022-02-19T10:06:37.439Z',
        email: 'string',
        name: 'string',
        phoneNumber: 'string',
        status: 'ACTIVE',
        updatedAt: '2022-02-19T10:06:37.439Z',
      },
      applicationId: 0,
      confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
      createdAt: '2022-02-19T10:06:37.439Z',
      result: {
        interviewEndedAt: '2022-02-19T10:06:37.439Z',
        interviewStartedAt: '2022-02-19T10:06:37.439Z',
        status: 'INTERVIEW_FAILED',
      },
      team: {
        createdAt: '2022-02-19T10:06:37.439Z',
        createdBy: 'string',
        name: 'string',
        teamId: 0,
        updatedAt: '2022-02-19T10:06:37.439Z',
        updatedBy: 'string',
      },
      updatedAt: '2022-02-19T10:06:37.439Z',
    },
    {
      applicant: {
        applicantId: 0,
        createdAt: '2022-02-19T10:06:37.439Z',
        email: 'string',
        name: 'string',
        phoneNumber: 'string',
        status: 'ACTIVE',
        updatedAt: '2022-02-19T10:06:37.439Z',
      },
      applicationId: 0,
      confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
      createdAt: '2022-02-19T10:06:37.439Z',
      result: {
        interviewEndedAt: '2022-02-19T10:06:37.439Z',
        interviewStartedAt: '2022-02-19T10:06:37.439Z',
        status: 'INTERVIEW_FAILED',
      },
      team: {
        createdAt: '2022-02-19T10:06:37.439Z',
        createdBy: 'string',
        name: 'string',
        teamId: 0,
        updatedAt: '2022-02-19T10:06:37.439Z',
        updatedBy: 'string',
      },
      updatedAt: '2022-02-19T10:06:37.439Z',
    },
    {
      applicant: {
        applicantId: 0,
        createdAt: '2022-02-19T10:06:37.439Z',
        email: 'string',
        name: 'string',
        phoneNumber: 'string',
        status: 'ACTIVE',
        updatedAt: '2022-02-19T10:06:37.439Z',
      },
      applicationId: 0,
      confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
      createdAt: '2022-02-19T10:06:37.439Z',
      result: {
        interviewEndedAt: '2022-02-19T10:06:37.439Z',
        interviewStartedAt: '2022-02-19T10:06:37.439Z',
        status: 'INTERVIEW_FAILED',
      },
      team: {
        createdAt: '2022-02-19T10:06:37.439Z',
        createdBy: 'string',
        name: 'string',
        teamId: 0,
        updatedAt: '2022-02-19T10:06:37.439Z',
        updatedBy: 'string',
      },
      updatedAt: '2022-02-19T10:06:37.439Z',
    },
  ];

  return (
    <div>
      <Table<ApplicationResponse>
        prefix="application"
        columns={columns}
        rows={data}
        isLoading={false}
      />
      <Pagination
        pageOptions={pageOptions}
        selectableSize
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />
    </div>
  );
};

export default ApplicationList;
