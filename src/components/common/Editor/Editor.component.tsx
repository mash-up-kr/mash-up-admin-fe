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
  const [isDataChanged, setIsDataChanged] = useState(false);

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
        const newEditorData = (await editorRef.current?.saver.save()) as OutputData;
        localStorage.setItem(id, JSON.stringify(newEditorData));
        setEditorData(newEditorData);
        if (editorData.time !== newEditorData.time) setIsDataChanged(true);
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

  /** Tab을 입력했을 때 에디터 밖으로 TabIndex가 변경되는 것을 방지 */
  useEffect(() => {
    const isEditorFocused = editorRef.current?.blocks?.getCurrentBlockIndex() !== -1;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditorFocused && event.key === 'Tab') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div id={id} />;
      <Blocker isBlocking={isDataChanged} />
    </>
  );
};

export default Editor;
