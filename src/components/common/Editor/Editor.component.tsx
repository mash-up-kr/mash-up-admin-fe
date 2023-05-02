import React, { useState, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import TextVariantTune from '@editorjs/text-variant-tune';
import DragDrop from 'editorjs-drag-drop';
import Paragraph from '@editorjs/paragraph';

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

interface EditorProps {
  id: string;
}

const Editor = ({ id }: EditorProps) => {
  const autoSaveStorageKey = `${id}-editor`;
  const savedData = localStorage.getItem(autoSaveStorageKey)
    ? JSON.parse(localStorage.getItem(autoSaveStorageKey) ?? '{}')
    : DEFAULT_INITIAL_DATA;

  const ejInstance = useRef<EditorJS>();
  const [editorData, setEditorData] = useState<OutputData>(savedData);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
        // eslint-disable-next-line no-new
        new DragDrop(editor);
      },
      onChange: async () => {
        const content = (await ejInstance.current?.saver.save()) as OutputData;
        localStorage.setItem(autoSaveStorageKey, JSON.stringify(content));
        setEditorData(content);
      },
      autofocus: true,
      tools: {
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
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },

        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        underline: Underline,
        textVariant: TextVariantTune,
      },
      tunes: ['textVariant'],
    });
  };

  useEffect(() => {
    if (!ejInstance.current) initEditor();

    return () => {
      ejInstance.current?.destroy();
    };
  }, []);

  return <div id={id} />;
};

export default Editor;
