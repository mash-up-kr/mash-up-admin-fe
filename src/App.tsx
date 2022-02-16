import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

import { PATH } from './constants';
import { CreateApplicationForm } from './pages';
import { Layout } from '@/components';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={PATH.APPLICATION_FORM_CREATE} element={<CreateApplicationForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
