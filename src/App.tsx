import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

import Count from '@/components/Count';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Count />} />
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
