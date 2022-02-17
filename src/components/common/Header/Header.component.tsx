import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as Styled from './Header.styled';

import Logo from '@/assets/svg/logo-admin-272.svg';
import {
  NavigationItem,
  NavigationSize,
} from '@/components/common/Navigation/Navigation.component';
import {
  Team,
  Role,
  TeamType,
  RoleType,
} from '@/components/common/UserProfile/UserProfile.component';

import { colors } from '@/styles';

import { Navigation, UserProfile } from '@/components';
import { $me } from '@/store';

// TODO: (@mango90): router 변경해주기
const navigationItems: NavigationItem[] = [
  {
    label: '지원서 내역',
    to: window.location.pathname,
  },
  {
    label: 'SMS 발송 내역',
    to: '/1',
  },
  {
    label: '지원서 설문지 내역',
    to: '/2',
  },
];

const Header = () => {
  const { data } = useRecoilValue($me);
  // TODO:(용재) 더 좋은 방법 생각해보기
  const [team, role] = useMemo(() => {
    const pos = data?.adminMember?.position?.split('_');
    if (pos?.length === 2) {
      return pos;
    }

    return [Team.branding, Role.subLeader];
  }, [data]);

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
        <UserProfile team={team as TeamType} role={role as RoleType} />
      </Styled.HeaderContainerInner>
    </Styled.HeaderContainer>
  );
};

export default Header;
