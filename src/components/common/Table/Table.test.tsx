import { Application } from '@/types';
import { TableColumn } from './Table.component';
import { renderTable } from './Table.testUtil';

const columns: TableColumn<Application>[] = [
  {
    title: '이름',
    accessor: 'name',
  },
  {
    title: '전화번호',
    accessor: 'phoneNumber',
  },
  {
    title: '지원플랫폼',
    accessor: 'team',
  },
  {
    title: '면접일시',
    accessor: 'result.interviewStartedAt',
  },
  {
    title: '사용자확인여부',
    accessor: 'confirmationStatus',
  },
  {
    title: '합격여부',
    accessor: 'result.status',
  },
];

const data: Application[] = [
  {
    applicantId: 1,
    name: '박민수',
    phoneNumber: '010-1234-5678',
    team: 'Node',
    result: { interviewStartedAt: '2022-02-16', status: '서류검토' },
    confirmationStatus: '미확인',
  },
  {
    applicantId: 1,
    name: '박민수르',
    phoneNumber: '010-1234-5678',
    team: 'Web',
    result: { interviewStartedAt: '2022-02-17', status: '서류합격' },
    confirmationStatus: '확인',
  },
  {
    applicantId: 1,
    name: '박민수',
    phoneNumber: '010-1234-5678',
    team: 'Web',
    result: { interviewStartedAt: '2022-02-16', status: '서류검토' },
    confirmationStatus: '미확인',
  },
  {
    applicantId: 1,
    name: '박민수',
    phoneNumber: '010-1234-5678',
    team: 'Web',
    result: { interviewStartedAt: '2022-02-16', status: '서류검토' },
    confirmationStatus: '미확인',
  },
];

describe('<Table />', () => {
  it('data가 없는 경우, data가 없다는 문구가 렌더링 되어야 한다.', () => {});

  it('기본 필드가 렌더링 되어야 한다.', () => {
    // Given
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
    expect(tableRows[1].textContent).toBe('박민수르010-1234-5678Web2022-02-17확인서류합격');
  });

  it('data를 받아오는 중에는 loading 화면이 렌더링 되어야 한다.', () => {});

  it('정렬을 할 수 있는 column은 화살표 icon이 함께 렌더링되어야 한다.', () => {});

  it('정렬을 할 수 있는 column은 클릭할 수 있으며, 바인딩 된 핸들러가 실행되어야 한다.', () => {});

  it('row를 선택할때는 checkbox가 렌더링 되어야 한다.', () => {});

  it('row를 선택하면, 해당 row가 선택되어야 한다.', () => {});

  it('row를 전부 선택하면 전체 checkbox가 선택되어야 한다.', () => {});

  it('전체 checkbox를 선택하면, 전체 row가 선택되어야 한다.', () => {});

  it('넘겨받은 컴포넌트로 Cell을 커스텀할 수 있어야 한다.', () => {});
});
