import React from 'react';
import { Global } from '@emotion/react';
import resetCss from '@styles/resetCss';
import Count from '@components/Count';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Count />
  </div>
);

export default App;
