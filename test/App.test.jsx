import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';

import App from '@/App';

const renderApp = ({ path }) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </MemoryRouter>,
  );

describe('App이 렌더링된다', () => {
  it('/', () => {
    const { container } = renderApp({ path: '/' });

    expect(container).toHaveTextContent('Counter Component State : ');
  });
});
