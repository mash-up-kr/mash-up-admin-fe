import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components';
import * as Styled from './Layout.styled';

const Layout = () => {
  const { pathname } = useLocation();

  const isBackgroundGray = useMemo(() => ['/login'].some((each) => each === pathname), [pathname]);

  return (
    <>
      <Header />
      <Styled.Main isBackgroundGray={isBackgroundGray}>
        <section>
          <Outlet />
        </section>
      </Styled.Main>
    </>
  );
};

export default Layout;
