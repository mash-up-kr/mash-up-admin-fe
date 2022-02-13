import React from 'react';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme} />
  </>
);

export default App;
