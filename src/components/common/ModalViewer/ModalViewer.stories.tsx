import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRecoilState } from 'recoil';
import ModalViewer from './ModalViewer.component';
import { Button } from '@/components';
import { $modalSelector, ModalKey } from '@/store';
import {
  POPUP_CLOSE,
  SMS_COMPLETE,
} from '@/components/common/AlertModalDialog/AlertModalDialog.component';

export default {
  title: 'Modal Viewer',
} as ComponentMeta<typeof ModalViewer>;

const Template: ComponentStory<typeof ModalViewer> = () => {
  const [modal, setModal] = useRecoilState($modalSelector(ModalKey.alertModalDialog));
  return (
    <div>
      <Button
        onClick={() =>
          setModal({
            ...modal,
            props: SMS_COMPLETE,
            isOpen: true,
          })
        }
      >
        SMS 발송 완료 알럿모달
      </Button>
      <Button
        onClick={() =>
          setModal({
            ...modal,
            props: POPUP_CLOSE,
            isOpen: true,
          })
        }
      >
        팝업 닫기 알럿모달
      </Button>
      <ModalViewer />
    </div>
  );
};

export const modalViewer = Template.bind({});
