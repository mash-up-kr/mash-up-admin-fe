import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './Header.styled';

import Logo from '@/assets/svg/logo-admin-133.svg';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.HeaderContainerInner>
        <Link to="/">
          <Logo />
          <Styled.VisuallyHiddenLogo>Mash-Up Adminsoo</Styled.VisuallyHiddenLogo>
        </Link>
      </Styled.HeaderContainerInner>
    </Styled.HeaderContainer>
  );
};

export default Header;
