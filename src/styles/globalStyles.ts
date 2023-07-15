import { css } from '@emotion/react';
import spoqaHanSansNeo from '@/styles/fonts/spoqaHanSansNeo';
import resetCss from './resetCss';
import editorCss from './editorCss';

export const globalStyles = css`
  ${spoqaHanSansNeo}
  ${resetCss}
  ${editorCss}
  #root {
    min-width: 89.6rem;
  }
`;
