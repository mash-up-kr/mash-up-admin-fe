import React, { ReactNode } from 'react';
import { Routes, Route, Navigate, NavigateProps } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { ModalViewer, Layout } from '@/components';

import { theme, globalStyles } from './styles';

import LoginPage from './pages/LoginPage/LoginPage.page';
import { $me, $isAuthorized } from './store';
import * as api from './api';
import { ACCESS_TOKEN, PATH } from './constants';

import { ApplicationList, ApplicationFormList, CreateApplicationForm } from './pages';

interface RequiredAuthProps extends Partial<NavigateProps> {
  children: ReactNode;
  isAuth: boolean;
}

const RequiredAuth = ({ children, isAuth, to = PATH.LOGIN, ...restProps }: RequiredAuthProps) => {
  if (!isAuth) {
    return <Navigate {...restProps} to={to} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const App = () => {
  const isAuthorized = useRecoilValue($isAuthorized);

  useRecoilCallback(({ snapshot, set, reset }) => async () => {
    const isAuthorizedSnapshot = snapshot.getLoadable($isAuthorized).contents;

    if (isAuthorizedSnapshot) {
      try {
        const { data: me } = await api.getMyInfo();
        set($me, { accessToken: localStorage.getItem(ACCESS_TOKEN) as string, adminMember: me });
      } catch (e) {
        localStorage.removeItem(ACCESS_TOKEN);
        reset($me);
      }
    }
  })();

  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ModalViewer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path={PATH.APPLICATION}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ApplicationList />
                </RequiredAuth>
              }
            />
            <Route
              path={PATH.APPLICATION_FORM}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ApplicationFormList />
                </RequiredAuth>
              }
            />
            <Route
              path={PATH.APPLICATION_FORM_CREATE}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <CreateApplicationForm />
                </RequiredAuth>
              }
            />
            <Route path="/" element={<Navigate to={PATH.LOGIN} />} />
          </Route>
          <Route
            path={PATH.LOGIN}
            element={
              <RequiredAuth isAuth={!isAuthorized} to={PATH.APPLICATION}>
                <LoginPage />
              </RequiredAuth>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
