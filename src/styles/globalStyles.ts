import { css } from '@emotion/react';
import spoqaHanSansNeo from '@/styles/fonts/spoqaHanSansNeo';
import resetCss from './resetCss';

export const globalStyles = css`
  ${spoqaHanSansNeo}
  ${resetCss}
  #root {
    min-width: 89.6rem;
  }

  #editorjs {
    max-width: 80%;
    margin: 0 auto;
    border: 1px solid blue;
  }

  .ce-toolbar__actions {
    top: 0px;
  }

  h1.ce-header {
    font-weight: 800;
    font-size: 4.6rem;
  }

  h2.ce-header {
    font-weight: 800;
    font-size: 3.201rem;
  }

  h3.ce-header {
    font-weight: 700;
    font-size: 1.8rem;
  }

  .ce-block {
    width: 100%;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.08rem;
  }

  li.cdx-list__item {
    list-style-type: unset;
  }
`;
