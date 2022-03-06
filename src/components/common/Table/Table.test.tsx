import { ReactNode } from 'react';
import { ApplicationResponse } from '@/types';
import { TableColumn } from './Table.component';
import { renderTable } from './Table.testUtil';

jest.mock('@/components', () => ({
  Textarea: 'Textarea',
}));

describe('<Table />', () => {
  const getMockProps = (renderCustomNameColumn?: (cellValue: unknown) => ReactNode) => {
    const columns: TableColumn<ApplicationResponse>[] = [
      {
        title: '이름',
        accessor: 'applicant.name',
        widthRatio: '10%',
        renderCustomCell: renderCustomNameColumn,
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
        title: '면접일시',
        accessor: 'result.interviewStartedAt',
        widthRatio: '25%',
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
          name: '박민수',
          phoneNumber: '010-1234-5678',
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
          name: 'web',
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

    return { columns, data };
  };

  it('data가 없는 경우, data가 없다는 문구가 렌더링 되어야 한다.', () => {});

  it('기본 필드가 렌더링 되어야 한다.', () => {
    // Given
    const { columns, data } = getMockProps();
    const { TableHeader, TableRows } = renderTable({
      _columns: columns,
      _data: data,
    });

    // When
    const tableHeader = TableHeader();
    const tableRows = TableRows();

    // Then
    expect(tableHeader).toBeInTheDocument();
    expect(tableHeader.textContent).toBe('이름전화번호지원플랫폼면접일시사용자확인여부합격여부');
    expect(tableRows.length).toBe(4);
    expect(tableRows[1]).toBeInTheDocument();
    expect(tableRows[1].textContent).toBe(
      '박민수010-1234-5678web2022-02-19T10:06:37.439ZFINAL_CONFIRM_ACCEPTEDINTERVIEW_FAILED',
    );
  });

  it('data를 받아오는 중에는 loading 화면이 렌더링 되어야 한다.', () => {});

  it('정렬을 할 수 있는 column은 화살표 icon이 함께 렌더링되어야 한다.', () => {});

  it('정렬을 할 수 있는 column은 클릭할 수 있으며, 바인딩 된 핸들러가 실행되어야 한다.', () => {});

  it('row를 선택할때는 checkbox가 렌더링 되어야 한다.', () => {});

  it('row를 선택하면, 해당 row가 선택되어야 한다.', () => {});

  it('row를 전부 선택하면 전체 checkbox가 선택되어야 한다.', () => {});

  it('전체 checkbox를 선택하면, 전체 row가 선택되어야 한다.', () => {});

  it('넘겨받은 renderProps로 Cell을 커스텀할 수 있어야 한다.', () => {
    // // Given
    // const renderCustomNameColumn = (cellValue: any) => `${cellValue}123`;
    // const { columns, data } = getMockProps(renderCustomNameColumn);
    // const { TableRows } = renderTable({
    //   _columns: columns,
    //   _data: data,
    // });
    // // When
    // const tableRows = TableRows();
    // // Then
    // expect(tableRows[1]).toBeInTheDocument();
    // expect(tableRows[1].querySelectorAll('td')[0].textContent).toBe('박민수르123');
  });
});
