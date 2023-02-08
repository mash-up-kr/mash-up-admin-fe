import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components';
import * as Styled from './Layout.styled';
import { PATH } from '@/constants';
import { GenerationSelect } from '@/components/Generation';

const Layout = () => {
  const { pathname } = useLocation();

  const isBackgroundGray = useMemo(
    () =>
      ['login', 'application/', 'application-form/', 'activity-score/', 'schedule/'].some((each) =>
        pathname.includes(each),
      ),
    [pathname],
  );

  const isListPage = useMemo(
    () =>
      [
        PATH.APPLICATION,
        PATH.APPLICATION_FORM,
        PATH.ACTIVITY_SCORE,
        PATH.ACTIVITY_SCORE,
        PATH.SCHEDULE,
      ].some((each) => pathname === each),
    [pathname],
  );

  return (
    <>
      <Header />
      <Styled.Main isBackgroundGray={isBackgroundGray}>
        <section>
          {isListPage && (
            <Styled.SelectWrapper>
              <GenerationSelect />
            </Styled.SelectWrapper>
          )}
          <Outlet />
        </section>
      </Styled.Main>
    </>
  );
};

export default Layout;
