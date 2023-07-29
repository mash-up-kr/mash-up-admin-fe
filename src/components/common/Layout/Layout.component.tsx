import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, LNB } from '@/components';
import * as Styled from './Layout.styled';
import { PATH } from '@/constants';
import { GenerationSelect } from '@/components/Generation';

const Layout = () => {
  const { pathname } = useLocation();

  const isBackgroundGray = useMemo(
    () =>
      [
        'login',
        'application/',
        'application-form/',
        'activity-score/',
        'schedule/',
        'recruit/',
      ].some((each) => pathname.includes(each)),
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
      <Styled.Wrapper>
        <LNB />
        <Styled.Main>
          <Styled.Container isBackgroundGray={isBackgroundGray}>
            <section>
              {isListPage && (
                <Styled.SelectWrapper>
                  <GenerationSelect />
                </Styled.SelectWrapper>
              )}
              <Outlet />
            </section>
          </Styled.Container>
        </Styled.Main>
      </Styled.Wrapper>
    </>
  );
};

export default Layout;
