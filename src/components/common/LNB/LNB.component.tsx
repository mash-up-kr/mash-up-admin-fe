import React from 'react';
import { PATH } from '@/constants';
import {
  NavigationItem,
  NavigationSize,
} from '@/components/common/Navigation/Navigation.component';
import { colors } from '@/styles';

import { Navigation } from '@/components';

import ApplicationIcon from '@/assets/svg/application.svg';
import ApplicationFormIcon from '@/assets/svg/application-form.svg';
import EmailIcon from '@/assets/svg/email.svg';
import ActivityScoreIcon from '@/assets/svg/activity-score.svg';
import ScheduleIcon from '@/assets/svg/schedule.svg';
// import SignupCodeIcon from "@/assets/svg/signup-code.svg"
// import RecruitIcon from "@/assets/svg/recruit.svg"
// import AdminMembersIcon from '@/assets/svg/admin-members.svg';
// import MyPageIcon from "@/assets/svg/my-page.svg"

const navigationItems: NavigationItem[] = [
  {
    title: '리크루팅 관리',
    menus: [
      {
        label: '지원서',
        to: PATH.APPLICATION,
        icon: <ApplicationIcon />,
      },
      {
        label: '지원서 설문지',
        to: PATH.APPLICATION_FORM,
        icon: <ApplicationFormIcon />,
      },
      {
        label: '이메일 발송 내역',
        to: PATH.EMAIL,
        icon: <EmailIcon />,
      },
    ],
  },
  {
    title: '출석 체크 앱',
    menus: [
      {
        label: '활동점수',
        to: PATH.ACTIVITY_SCORE,
        icon: <ActivityScoreIcon />,
      },
      {
        label: '스케줄 정보',
        to: PATH.SCHEDULE,
        icon: <ScheduleIcon />,
      },
      // TODO: 추가 예정 메뉴
      // {
      //   label: '가입 코드',
      //   to: PATH.SIGNUP_CODE,
      // },
    ],
  },
  // TODO: 추가 예정 메뉴
  // {
  //   title: '콘텐츠 관리',
  //   menus: [
  //     {
  //       label: '모집 공고',
  //       to: PATH.RECRUIT,
  //     },
  //   ],
  // },
  // {
  //   title: '계정 관리',
  //   menus: [
  //     {
  //       label: '계정 목록',
  //       to: PATH.ADMIN_MEMBERS,
  //       icon: <AdminMembersIcon />,
  //     },
  // {
  //   label: '내 정보',
  //   to: PATH.MY_PAGE,
  // },
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