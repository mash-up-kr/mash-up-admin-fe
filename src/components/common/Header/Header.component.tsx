import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as Styled from './Header.styled';

import Logo from '@/assets/svg/logo-admin-272.svg';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';

import { PopOver, UserProfile } from '@/components';
import { $profile } from '@/store';

const Header = () => {
  const [team, role] = useRecoilValue($profile);

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderContainerInner>
        <Link to="/">
          <Logo />
          <Styled.VisuallyHiddenLogo>Mash-Up Adminsoo</Styled.VisuallyHiddenLogo>
        </Link>
        <PopOver>
          <UserProfile team={team as TeamType} role={role as RoleType} />
        </PopOver>
      </Styled.HeaderContainerInner>
    </Styled.HeaderContainer>
  );
};

export default Header;
