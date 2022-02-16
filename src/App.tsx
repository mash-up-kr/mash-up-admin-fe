import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

import { Layout } from '@/components';
import Count from '@/components/Count';
import LoginPage from '@/pages/LoginPage/LoginPage.page';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Count />} />
          {/* // TODO:(용재) path 객체 사용하도록 변경 */}
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
