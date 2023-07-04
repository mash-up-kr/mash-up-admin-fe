import { css } from '@emotion/react';
import spoqaHanSansNeo from '@/styles/fonts/spoqaHanSansNeo';
import resetCss from './resetCss';

export const globalStyles = css`
  ${spoqaHanSansNeo}
  ${resetCss}
  #root {
    min-width: 89.6rem;
  }

  #platform-recruit-editor {
    min-height: 20rem;
    margin: 0 auto;
    padding: 4rem 2rem 4rem 6rem;
    background-color: #ffffff;
    border: 0.1rem solid #dee2e6;
    border-radius: 2rem;
  }

  .codex-editor {
    width: 78.4rem;
  }

  .codex-editor--narrow .codex-editor__redactor {
    margin-right: 0px;
  }

  .ce-toolbar {
    left: -12rem;
  }

  .ce-toolbar__actions {
    top: -2px;
    left: -6rem;
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
    margin: 1.6rem 0;
    padding: 0;
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

  div.ce-block__content {
    max-width: 1000px;
  }

  .ce-toolbar__settings-btn--hidden {
    display: unset;
  }

  .ce-toolbar__plus,
  .ce-toolbar__settings-btn {
    display: flex;
    align-items: center;
    margin-left: 0;
    color: #868e96;
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

  .cdx-block {
    padding: 0.2rem 0;
  }

  ul.cdx-block.cdx-list {
    padding: 0;
  }

  li.cdx-list__item {
    margin-left: 2.5rem;
    padding: 0.3rem 0 0.3rem 0.3rem;
    list-style-type: unset;
  }

  /** 불필요한 반응형 제거 */
  @media (min-width: 651px) {
    .codex-editor--narrow .ce-toolbox {
      left: 0;

      .ce-popover {
        left: 0;
      }
    }
  }
`;
