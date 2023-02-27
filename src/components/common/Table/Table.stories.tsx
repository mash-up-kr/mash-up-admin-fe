import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ApplicationFormResponse } from '@/types/dto/applicationForm';
import Table, { TableProps, TableColumn } from './Table.component';
import * as Styled from '@/pages/ApplicationFormList/ApplicationFormList.styled';
import { UserProfile } from '@/components';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { formatDate } from '@/utils';
import { SORT_TYPE } from '@/constants';
import { SortType } from '@/components/common/Table/Table.component';

export default {
  title: 'Table',
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = <T extends object>(args: TableProps<T>) => {
  return <Table {...args} />;
};

const columns: TableColumn<ApplicationFormResponse>[] = [
  {
    title: '플랫폼',
    accessor: 'team.name',
    widthRatio: '9%',
  },
  {
    title: '지원서 설문지 문서명',
    accessor: 'name',
    widthRatio: '28%',
  },
  {
    title: '작성자',
    accessor: 'createdBy',
    widthRatio: '14%',
  },
  {
    title: '작성일시',
    accessor: 'createdAt',
    widthRatio: '21%',
  },
  {
    title: '수정일시',
    accessor: 'updatedAt',
    widthRatio: '21%',
  },
];

const columnsWithCustomCell: TableColumn<ApplicationFormResponse>[] = [
  {
    title: '플랫폼',
    accessor: 'team.name',
    widthRatio: '9%',
  },
  {
    title: '지원서 설문지 문서명',
    accessor: 'name',
    idAccessor: 'applicationFormId',
    widthRatio: '28%',
    renderCustomCell: ({ cellValue }) => (
      <Styled.FormTitleWrapper title={cellValue as string}>
        <Styled.FormTitle>{cellValue as string}</Styled.FormTitle>
      </Styled.FormTitleWrapper>
    ),
  },
  {
    title: '작성자',
    accessor: 'createdBy',
    widthRatio: '14%',
    renderCustomCell: ({ cellValue }) => {
      const [team, role] = (cellValue as string).split('_') as [TeamType, RoleType];
      return (
        <Styled.CustomUserProfile>
          <UserProfile team={team} role={role} showBackground={false} />
        </Styled.CustomUserProfile>
      );
    },
  },
  {
    title: '작성일시',
    accessor: 'createdAt',
    widthRatio: '21%',
    renderCustomCell: ({ cellValue }) =>
      formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
  },
  {
    title: '수정일시',
    accessor: 'updatedAt',
    widthRatio: '21%',
    renderCustomCell: ({ cellValue }) =>
      formatDate(cellValue as string, 'YYYY년 M월 D일 A h시 m분'),
  },
];

const rows = [
  {
    applicationFormId: 187,
    name: '안드로이드 설문지2',
    team: {
      teamId: 7,
      name: 'Android',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.394',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.394',
    },
    questions: [
      {
        questionId: 578,
        content: '질문 내용1ㄴㅇㄹㄴㅇㄹㄴㅇㄹ',
        maxContentLength: null,
        description: 'ㅁㅇㅈㅇㅁㅇㅁㅈㅇㅁㅇㅁㅇㅈㅇㅁ',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-20T17:01:56',
    createdBy: 'BRANDING_MEMBER',
    updatedAt: '2022-02-24T00:23:04',
    updatedBy: 'ANDROID_SUBLEADER',
  },
  {
    applicationFormId: 275,
    name: '옛다 디자인 설문지^^',
    team: {
      teamId: 5,
      name: 'Design',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.238',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.238',
    },
    questions: [
      {
        questionId: 576,
        content: '류하준 수정해따',
        maxContentLength: 100,
        description: '화이탱',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 577,
        content: '질문하나더추가함',
        maxContentLength: null,
        description: '',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-22T04:52:29',
    createdBy: 'MASHUP_SUBLEADER',
    updatedAt: '2022-02-23T11:48:01',
    updatedBy: 'BRANDING_MEMBER',
  },
  {
    applicationFormId: 402,
    name: 'QA시에 이 설문지는 지우지 말아주세요 (지원서 페이지 개발용)',
    team: {
      teamId: 6,
      name: 'Web',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.323',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.323',
    },
    questions: [
      {
        questionId: 403,
        content: '자기 소개 및 지원 동기에 대해 말씀해주세요',
        maxContentLength: 512,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 404,
        content: 'Mash-Up 에서 하고 싶은 활동이나 기대되는 것에 대해 말씀해주세요!',
        maxContentLength: 256,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 405,
        content: 'Github 주소',
        maxContentLength: null,
        description: '',
        required: false,
        questionType: 'SINGLE_LINE_TEXT',
      },
      {
        questionId: 406,
        content: '블로그 주소',
        maxContentLength: null,
        description: '',
        required: true,
        questionType: 'SINGLE_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-22T22:45:26',
    createdBy: 'WEB_LEADER',
    updatedAt: '2022-02-22T22:45:26',
    updatedBy: 'WEB_LEADER',
  },
  {
    applicationFormId: 396,
    name: '웹팀 설문지',
    team: {
      teamId: 9,
      name: 'Node',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.566',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.566',
    },
    questions: [
      {
        questionId: 397,
        content: '1',
        maxContentLength: null,
        description: '1',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 398,
        content: '1',
        maxContentLength: null,
        description: '1',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 399,
        content: '2',
        maxContentLength: null,
        description: '2',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 400,
        content: '3',
        maxContentLength: null,
        description: '3',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-22T21:52:48',
    createdBy: 'WEB_LEADER',
    updatedAt: '2022-02-22T21:52:48',
    updatedBy: 'WEB_LEADER',
  },
  {
    applicationFormId: 376,
    name: 'iOS 12기 ROOKIE RECRUITING 지원서당',
    team: {
      teamId: 8,
      name: 'iOS',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.494',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.494',
    },
    questions: [
      {
        questionId: 382,
        content: 'iOS vs Android. 당신의 선택은?',
        maxContentLength: 300,
        description: '이유 5가지 이상을 기재해주세요. 수정',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 383,
        content: '어떤 개발자가 되고 싶은가?',
        maxContentLength: null,
        description: '예를 들면 . 저는 돌멩이가 되고 싶습니다!',
        required: false,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 384,
        content: '남수 vs 문정 vs 동영 ',
        maxContentLength: null,
        description: '누가 더 좋아요?',
        required: true,
        questionType: 'SINGLE_LINE_TEXT',
      },
      {
        questionId: 385,
        content: '웁키풉키',
        maxContentLength: 20,
        description: 'ㅋㄷㅋㄷ',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-22T21:11:46',
    createdBy: 'MASHUP_LEADER',
    updatedAt: '2022-02-22T21:11:46',
    updatedBy: 'MASHUP_LEADER',
  },
  {
    applicationFormId: 311,
    name: '스프링팀 11기 설문지',
    team: {
      teamId: 10,
      name: 'Spring',
      createdBy: null,
      createdAt: '2022-02-11T16:19:55.637',
      updatedBy: null,
      updatedAt: '2022-02-11T16:19:55.637',
    },
    questions: [
      {
        questionId: 312,
        content:
          '\ud83d\udcac 경험을 바탕으로 자기 소개 및 지원 동기에 대해 말씀해주세요. (최대 500자)',
        maxContentLength: 500,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 313,
        content:
          '\ud83e\uddd0 경력 혹은 활동사항이나 프로젝트 경험이 있다면 자유롭게 말씀해주세요. (최대 500자)',
        maxContentLength: 500,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 314,
        content:
          '\ud83d\udc40 주변 사람들이 말하는 당신은 어떤 사람인지 말씀해주세요. (최대 300자)',
        maxContentLength: 300,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 315,
        content: '✨ 동아리에 기여해줄 수 있는 부분이 있으면 말씀해주세요. (최대 200자)',
        maxContentLength: 200,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 316,
        content:
          '\ud83e\udd70 향후 Mash-Up에서 하고 싶은 활동이나 기대되는 것이 있다면 말씀해주세요. (최대 200자)',
        maxContentLength: 200,
        description: '',
        required: true,
        questionType: 'MULTI_LINE_TEXT',
      },
      {
        questionId: 317,
        content: '\ud83d\udda5 GitHub 혹은 블로그 주소가 있다면 알려주세요.',
        maxContentLength: null,
        description: '',
        required: false,
        questionType: 'SINGLE_LINE_TEXT',
      },
    ],
    createdAt: '2022-02-22T20:42:09',
    createdBy: 'BRANDING_MEMBER',
    updatedAt: '2022-02-22T20:42:09',
    updatedBy: 'BRANDING_MEMBER',
  },
];

export const NoData = Template.bind({});
NoData.args = {
  prefix: 'application-form',
  columns: columns as TableColumn<object>[],
  rows: [],
  isLoading: false,
  supportBar: {
    totalCount: 0,
    totalSummaryText: '총 지원설문지',
  },
};

export const Default = Template.bind({});
Default.args = {
  prefix: 'application-form',
  columns: columns as TableColumn<object>[],
  rows,
  isLoading: false,
  supportBar: {
    totalCount: rows.length,
    totalSummaryText: '총 지원설문지',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  prefix: 'application-form',
  columns: columns as TableColumn<object>[],
  rows,
  isLoading: true,
  supportBar: {
    totalCount: rows.length,
    totalSummaryText: '총 지원설문지',
  },
};

export const CustomCell = Template.bind({});
CustomCell.args = {
  prefix: 'application-form',
  columns: columnsWithCustomCell as TableColumn<object>[],
  rows,
  isLoading: false,
  supportBar: {
    totalCount: rows.length,
    totalSummaryText: '총 지원설문지',
  },
};

export const Sortable = Template.bind({});
Sortable.args = {
  prefix: 'application-form',
  columns: columnsWithCustomCell as TableColumn<object>[],
  rows,
  isLoading: false,
  supportBar: {
    totalCount: rows.length,
    totalSummaryText: '총 지원설문지',
  },
  sortOptions: {
    sortTypes: [
      { accessor: 'team.name', type: SORT_TYPE.DEFAULT },
      { accessor: 'name', type: SORT_TYPE.DEFAULT },
      { accessor: 'createdAt', type: SORT_TYPE.DEFAULT },
      { accessor: 'updatedAt', type: SORT_TYPE.DEFAULT },
    ] as SortType<object>[],
    disableMultiSort: true,
    handleSortColumn: () => {},
  },
};

export const Selectable = Template.bind({});
Selectable.args = {
  prefix: 'application-form',
  columns: columnsWithCustomCell as TableColumn<object>[],
  rows,
  isLoading: false,
  supportBar: {
    totalCount: rows.length,
    totalSummaryText: '총 지원설문지',
  },
  selectableRow: {
    selectedCount: 0,
    selectedRows: [],
    setSelectedRows: () => {},
    handleSelectAll: () => {},
  },
};
