import Header from '@editorjs/header';
import List from '@editorjs/list';
import Underline from '@editorjs/underline';
import Paragraph from '@editorjs/paragraph';

export default {
  /**
   * @type {EditorConfig.tools}
   */
  header: {
    class: Header,
    config: {
      placeholder: `Tab 으로 크기를 변경하세요.`,
      levels: [1, 2, 3, 4],
      defaultLevel: 3,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: `Tab 으로 새로운 블록을 추가하세요.`,
      preserveBlank: true,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  underline: Underline,
};
