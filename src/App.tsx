import React, { ReactNode, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, NavigateProps, useNavigate } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { ModalViewer, Layout, Toast } from '@/components';

import { theme, globalStyles } from './styles';

import { $me, $isAuthorized, $teams, $toast, $generations, $generationNumber } from './store';
import * as api from './api';
import { ACCESS_TOKEN, PATH } from './constants';

import {
  LoginPage,
  ApplicationList,
  ApplicationDetailView,
  SmsSendingList,
  ApplicationFormList,
  CreateApplicationForm,
  UpdateApplicationForm,
  ApplicationFormDetail,
  ActivityScoreList,
  ActivityScoreDetail,
  ErrorPage,
} from './pages';

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
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem(ACCESS_TOKEN);
  const isAuthorized = useRecoilValue($isAuthorized) || !!TOKEN;
  const toast = useRecoilValue($toast);
  const generationNumber = useRecoilValue($generationNumber);

  const getTeams = useRecoilCallback(({ set }) => async () => {
    const { data: teams } = await api.getTeams(generationNumber);

    set($teams, teams);
  });

  useRecoilCallback(({ snapshot, set, reset }) => async () => {
    const isAuthorizedSnapshot = snapshot.getLoadable($isAuthorized).contents;

    try {
      if (!isAuthorizedSnapshot && !!TOKEN) {
        const { data: me } = await api.getMyInfo();
        const { data: generations } = await api.getGenerations();

        set($me, { accessToken: TOKEN as string, adminMember: me });
        set($generations, generations);
      }
    } catch (e) {
      localStorage.removeItem(ACCESS_TOKEN);
      reset($me);
      navigate(PATH.LOGIN);
    }
  })();

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationNumber]);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={null}>
        <Global styles={globalStyles} />
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
              path={PATH.APPLICATION_DETAIL}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ApplicationDetailView />
                </RequiredAuth>
              }
            />
            <Route
              path={PATH.SMS}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <SmsSendingList />
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
              path={PATH.APPLICATION_FORM_DETAIL}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ApplicationFormDetail />
                </RequiredAuth>
              }
            />
            <Route
              path={PATH.APPLICATION_FORM_UPDATE}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <UpdateApplicationForm />
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
            <Route
              path={PATH.ACTIVITY_SCORE}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ActivityScoreList />
                </RequiredAuth>
              }
            />
            <Route
              path={PATH.ACTIVITY_SCORE_DETAIL}
              element={
                <RequiredAuth isAuth={isAuthorized}>
                  <ActivityScoreDetail />
                </RequiredAuth>
              }
            />
            <Route path="/" element={<Navigate to={TOKEN ? PATH.APPLICATION : PATH.LOGIN} />} />
          </Route>
          <Route
            path={PATH.LOGIN}
            element={
              <RequiredAuth isAuth={!isAuthorized} to={PATH.APPLICATION}>
                <LoginPage />
              </RequiredAuth>
            }
          />
          <Route path="*" element={<ErrorPage path={PATH.NOT_FOUND} />} />
          <Route path={PATH.FORBIDDEN} element={<ErrorPage path={PATH.FORBIDDEN} />} />
        </Routes>
        {toast && <Toast />}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
