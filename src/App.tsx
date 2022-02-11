import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

import Count from '@/components/Count';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Count />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default App;
