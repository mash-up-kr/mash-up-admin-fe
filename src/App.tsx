import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { theme, globalStyles } from '@/styles';

import { ModalViewer, Layout } from '@/components';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <ModalViewer />
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
