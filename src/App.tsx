import React from 'react';
import Test from '@components/Test';
import { Global } from '@emotion/react';
import resetCss from './utils/resetCss';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Test />
    world!
  </div>
);

export default App;
