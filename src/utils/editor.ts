export const getDefaultEditorData = () => {
  return {
    time: new Date().getTime(),
    blocks: [{ type: 'paragraph', data: {} }],
  };
};
