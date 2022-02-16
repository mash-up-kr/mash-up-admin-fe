import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './Header.styled';

import Logo from '@/assets/svg/logo-admin-272.svg';
import {
  NavigationItem,
  NavigationSize,
} from '@/components/common/Navigation/Navigation.component';
import { Team, Role } from '@/components/common/UserProfile/UserProfile.component';

import { colors } from '@/styles';

import { Navigation, UserProfile } from '@/components';
import { PATH } from '@/constants';

// TODO: (@mango90): router 변경해주기
const navigationItems: NavigationItem[] = [
  {
    label: '지원서 내역',
    to: PATH.APPLICATION,
  },
  {
    label: 'SMS 발송 내역',
    to: PATH.SMS,
  },
  {
    label: '지원서 설문지 내역',
    to: PATH.APPLICATION_FORM,
  },
];

const Header = () => {
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
        <UserProfile team={Team.branding} role={Role.subLeader} />
      </Styled.HeaderContainerInner>
    </Styled.HeaderContainer>
  );
};

export default Header;
