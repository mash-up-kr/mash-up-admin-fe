import React from 'react';
import { PATH } from '@/constants';
import {
  NavigationItem,
  NavigationSize,
} from '@/components/common/Navigation/Navigation.component';
import { colors } from '@/styles';

import { Navigation } from '@/components';

const navigationItems: NavigationItem[] = [
  {
    title: '리크루팅 관리',
    menus: [
      {
        label: '지원서',
        to: PATH.APPLICATION,
      },
      {
        label: '지원서 설문지',
        to: PATH.APPLICATION_FORM,
      },
      {
        label: '이메일 발송 내역',
        to: PATH.EMAIL,
      },
    ],
  },
  {
    title: '출석 체크 앱',
    menus: [
      {
        label: '활동점수',
        to: PATH.ACTIVITY_SCORE,
      },
      {
        label: '스케줄 정보',
        to: PATH.SCHEDULE,
      },
      // TODO: 추가 예정 메뉴
      // {
      //   label: '가입 코드',
      //   to: '',
      // },
    ],
  },
  // TODO: 추가 예정 메뉴
  // {
  //   title: '콘텐츠 관리',
  //   menus: [
  //     {
  //       label: '모집 공고',
  //       to: '',
  //     },
  //   ],
  // },
  // {
  //   title: '계정 관리',
  //   menus: [
  //     {
  //       label: '계정 목록',
  //       to: '#',
  //     },
  //     {
  //       label: '내 정보',
  //       to: '',
  //     },
  //   ],
  // },
];

const LNB = () => {
  return (
    <Navigation
      size={NavigationSize.md}
      items={navigationItems}
      inActiveColor={colors.gray70}
      showBottomBorder={false}
    />
  );
};

export default LNB;
