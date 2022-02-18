import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { theme, globalStyles } from './styles';

import { PATH } from './constants';
import { CreateApplicationForm } from './pages';
import { Layout, ModalViewer } from './components';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <ModalViewer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={PATH.APPLICATION_FORM_CREATE} element={<CreateApplicationForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
