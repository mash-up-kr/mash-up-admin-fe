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

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = () => {
  const ejInstance = useRef<EditorJS>();
  const [editorData, setEditorData] = useState<OutputData>(DEFAULT_INITIAL_DATA);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
        // eslint-disable-next-line no-new
        new DragDrop(editor);
      },
      onChange: async () => {
        const content = (await ejInstance.current?.saver.save()) as OutputData;
        setEditorData(content);
      },
      autofocus: true,
      tools: {
        header: Header,
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

  return <div id={EDITTOR_HOLDER_ID} />;
};

export default Editor;
