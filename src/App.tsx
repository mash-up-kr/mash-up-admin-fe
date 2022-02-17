import React, { ReactNode, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, NavigateProps } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { theme, globalStyles } from './styles';

import { ModalViewer, Layout } from './components';
import LoginPage from './pages/LoginPage/LoginPage.page';
import { $me } from './store';
import { handleGetMyInfo } from './api/login';
import { ACCESS_TOKEN } from './constants';

interface RequiredAuthProps extends Partial<NavigateProps> {
  children: ReactNode;
  isAuth: boolean;
}

// TODO:(용재) to 기본값 path 객체 이용하도록 변경
const RequiredAuth = ({ children, isAuth, to = '/login', ...restProps }: RequiredAuthProps) => {
  if (isAuth) {
    return <Navigate {...restProps} to={to} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const App = () => {
  const [me, setMe] = useRecoilState($me);

  useEffect(() => {
    (async () => {
      const isToken = !!localStorage.getItem(ACCESS_TOKEN);
      if (isToken) {
        try {
          const data = await handleGetMyInfo();
          setMe(data);
        } catch (e) {
          localStorage.removeItem(ACCESS_TOKEN);
          setMe({});
        }
      }
    })();
  }, [setMe]);

  const isAuth = useMemo(() => Object.keys(me).length !== 0, [me]);

  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ModalViewer />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* // TODO:(용재) 테스트용 - 추후 수정 */}
            <Route
              path="/application"
              element={
                <RequiredAuth isAuth={isAuth}>
                  <div>test</div>
                </RequiredAuth>
              }
            />
          </Route>
          {/* // TODO:(용재) path 객체 사용하도록 변경 */}
          <Route
            path="/login"
            // TODO:(용재) 테스트용 - 추후 수정
            element={
              <RequiredAuth isAuth={!isAuth} to="/application">
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
