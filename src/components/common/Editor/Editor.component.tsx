import React, { useState, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import { Blocker } from '@/components';
import i18n from './i18n';
import { getDefaultEditorData } from '@/utils';
import tools from './tools';

interface EditorProps {
  id: string;
  savedData: OutputData;
}

const Editor = ({ id, savedData }: EditorProps) => {
  const editorRef = useRef<EditorJS>();
  const [editorData, setEditorData] = useState<OutputData>(savedData);
  const [editorReady, setEditorReady] = useState(false);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id,
      data: editorData,
      onReady: () => {
        editorRef.current = editor;
        // eslint-disable-next-line no-new
        new DragDrop(editor);
        setEditorReady(true);
      },
      onChange: async () => {
        const content = (await editorRef.current?.saver.save()) as OutputData;
        localStorage.setItem(id, JSON.stringify(content));
        setEditorData(content);
      },
      autofocus: true,
      // @ts-expect-error: third party plugin
      tools,
      i18n,
    });
  };

  useEffect(() => {
    if (!editorRef.current) initEditor();

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    const newEditorData = savedData?.blocks ? savedData : getDefaultEditorData();
    setEditorData(newEditorData);
    editorRef.current.render(newEditorData);
  }, [editorReady, savedData]);

  return (
    <>
      <div id={id} />;
      <Blocker isBlocking={editorData.blocks?.length !== 0} />
    </>
  );
};

export default Editor;
