import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as Styled from './Header.styled';

import Logo from '@/assets/svg/logo-admin-272.svg';
import {
  NavigationItem,
  NavigationSize,
} from '@/components/common/Navigation/Navigation.component';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';

import { colors } from '@/styles';

import { Navigation, PopOver, UserProfile } from '@/components';
import { $profile } from '@/store';
import { PATH } from '@/constants';

// TODO: (@mango90): router 변경해주기
const navigationItems: NavigationItem[] = [
  {
    label: '지원서 내역',
    to: PATH.APPLICATION,
  },
  {
    label: '이메일 발송 내역',
    to: PATH.EMAIL,
  },
  {
    label: '지원서 설문지 내역',
    to: PATH.APPLICATION_FORM,
  },
  {
    label: '활동점수',
    to: PATH.ACTIVITY_SCORE,
  },
];

const Header = () => {
  const [team, role] = useRecoilValue($profile);

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderContainerInner>
        <Link to="/">
          <Logo />
          <Styled.VisuallyHiddenLogo>Mash-Up Adminsoo</Styled.VisuallyHiddenLogo>
        </Link>
        <Navigation
          size={NavigationSize.md}
          items={navigationItems}
          inActiveColor={colors.gray70}
          showBottomBorder={false}
        />
        <PopOver>
          <UserProfile team={team as TeamType} role={role as RoleType} />
        </PopOver>
      </Styled.HeaderContainerInner>
    </Styled.HeaderContainer>
  );
};

export default Header;
