import { css } from '@emotion/react';

export default css`
  #platform-recruit-editor,
  #platform-faq-editor {
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
    width: 50px;
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
    font-size: 1.6rem;
    line-height: 1.5;
  }

  .cdx-block {
    padding: 0;
  }

  ul.cdx-block.cdx-list {
    padding: 0;
  }

  li.cdx-list__item {
    margin-left: 2.5rem;
    padding: 0 0 0.6rem 0.3rem;
    list-style-type: unset;
  }

  /**
   * 'Header'에 'placeholder'가 있을 때 클릭 불가 이슈 수정
   * @see {@link https://github.com/codex-team/editor.js/issues/1130}
   */
  .ce-header[contentEditable='true'][data-placeholder]::before {
    pointer-events: none;
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

  /** 불필요한 반응형 제거 */
  @media (min-width: 651px) {
    .codex-editor--narrow .ce-block--focused {
      margin-right: 0;
      padding-right: 0;
    }
  }
`;
