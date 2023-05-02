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
    min-height: 20rem;
    margin: 0 auto;
    padding: 4.2rem 1.4rem;
    border: 0.1rem solid #dee2e6;
    border-radius: 1.2rem;
  }

  .ce-toolbar__actions {
    top: -2px;
    left: -245px;
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

  div.ce-block__content {
    max-width: 1000px;
  }

  .ce-toolbar__settings-btn--hidden {
    display: unset;
  }

  .ce-toolbar__plus,
  .ce-toolbar__settings-btn {
    color: #868e96;
  }

  div.codex-editor__redactor {
    padding-bottom: 100px !important;
  }

  .ce-toolbox .cdx-search-field,
  .ce-settings .cdx-search-field {
    display: none;
  }

  .ce-paragraph {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;
