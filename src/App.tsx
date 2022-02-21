// import React, { ReactNode, Suspense } from 'react';
import React, { Suspense } from 'react';
// import { Routes, Route, Navigate, NavigateProps } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
// import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useRecoilCallback } from 'recoil';
import { ModalViewer, Layout } from '@/components';

import { theme, globalStyles } from './styles';

import { $me, $isAuthorized, $teams } from './store';
import * as api from './api';
import { ACCESS_TOKEN, PATH } from './constants';

import {
  LoginPage,
  ApplicationFormList,
  ApplicationFormDetail,
  CreateApplicationForm,
  UpdateApplicationForm,
} from './pages';

// interface RequiredAuthProps extends Partial<NavigateProps> {
//   children: ReactNode;
//   isAuth: boolean;
// }

// const RequiredAuth = ({ children, isAuth, to = PATH.LOGIN, ...restProps }: RequiredAuthProps) => {
//   if (!isAuth) {
//     return <Navigate {...restProps} to={to} />;
//   }

//   // eslint-disable-next-line react/jsx-no-useless-fragment
//   return <>{children}</>;
// };

const App = () => {
  // const isAuthorized = useRecoilValue($isAuthorized);

  useRecoilCallback(({ snapshot, set, reset }) => async () => {
    const TOKEN = localStorage.getItem(ACCESS_TOKEN);
    const isAuthorizedSnapshot = snapshot.getLoadable($isAuthorized).contents;

    if (!!TOKEN && !isAuthorizedSnapshot) {
      try {
        const { data: me } = await api.getMyInfo();
        const { data: teams } = await api.getTeams();
        set($me, { accessToken: TOKEN as string, adminMember: me });
        set($teams, teams);
      } catch (e) {
        localStorage.removeItem(ACCESS_TOKEN);
        reset($me);
      }
    }
  })();

  return (
    <Suspense fallback={null}>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ModalViewer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path={PATH.APPLICATION_FORM}
              element={
                // <RequiredAuth isAuth={isAuthorized} to={PATH.LOGIN}>
                <ApplicationFormList />
                // </RequiredAuth>
              }
            />
            <Route
              path={PATH.APPLICATION_FORM_DETAIL}
              element={
                // <RequiredAuth isAuth={isAuthorized} to={PATH.LOGIN}>
                <ApplicationFormDetail />
                // </RequiredAuth>
              }
            />
            <Route
              path={PATH.APPLICATION_FORM_UPDATE}
              element={
                // <RequiredAuth isAuth={isAuthorized} to={PATH.LOGIN}>
                <UpdateApplicationForm />
                // </RequiredAuth>
              }
            />

            <Route
              path={PATH.APPLICATION_FORM_CREATE}
              element={
                // <RequiredAuth isAuth={isAuthorized}>
                <CreateApplicationForm />
                // </RequiredAuth>
              }
            />
            {/* <Route path="/" element={<Navigate to={PATH.LOGIN} />} /> */}
          </Route>
          <Route
            path={PATH.LOGIN}
            element={
              // <RequiredAuth isAuth={!isAuthorized} to={PATH.APPLICATION}>
              <LoginPage />
              // </RequiredAuth>
            }
          />
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
