import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import * as Styled from './Layout.styled';

const Layout = () => {
  return (
    <>
      <Header />
      <Styled.Main>
        <Styled.Content>
          <Outlet />
        </Styled.Content>
      </Styled.Main>
    </>
  );
};

export default Layout;
