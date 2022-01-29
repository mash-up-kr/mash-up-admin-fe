import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Global } from '@emotion/react';
import resetCss from '@/styles/resetCss';
import Count from '@/components/Count';

const App = () => (
  <>
    <Global styles={resetCss} />
    <Routes>
      <Route path="/" element={<Count />} />
    </Routes>
  </>
);

export default App;
