import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components';
import * as Styled from './Layout.styled';

const Layout = () => {
  const { pathname } = useLocation();

  const isBackgroundGray = useMemo(
    () =>
      ['login', 'application/', 'application-form/', 'activity-score/'].some((each) =>
        pathname.includes(each),
      ),
    [pathname],
  );

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
