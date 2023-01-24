import { css } from '@emotion/react';
import spoqaHanSansNeo from '@/styles/fonts/spoqaHanSansNeo';
import resetCss from './resetCss';

export const globalStyles = css`
  ${spoqaHanSansNeo}
  ${resetCss}
  #root {
    min-width: 89.6rem;
  }
`;
