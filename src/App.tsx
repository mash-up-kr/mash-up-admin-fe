import React from 'react';

import { Global, ThemeProvider } from '@emotion/react';
import { theme, globalStyles } from '@/styles';

import { ModalViewer } from '@/components';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <ModalViewer />
    </ThemeProvider>
  </>
);

export default App;
