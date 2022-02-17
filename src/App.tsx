import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { theme, globalStyles } from '@/styles';

import { ModalViewer, Layout } from '@/components';
import LoginPage from '@/pages/LoginPage/LoginPage.page';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <ModalViewer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* // TODO:(용재) path 객체 사용하도록 변경 */}
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
