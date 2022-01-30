import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import resetCss from '@/styles/resetCss';
import Count from '@/components/Count';

const App = () => (
  <>
    <Global styles={resetCss} />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Count />} />
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
