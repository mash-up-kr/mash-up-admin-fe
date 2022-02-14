import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRecoilState } from 'recoil';
import { useModal } from '@/hooks';
import ModalViewer from './ModalViewer.component';
import { Button } from '@/components';
import { $modalState, ModalKey } from '@/store';
import {
  POPUP_CLOSE,
  SMS_COMPLETE,
} from '@/components/common/AlertModalDialog/AlertModalDialog.component';

export default {
  title: 'Modal Viewer',
} as ComponentMeta<typeof ModalViewer>;

const Template: ComponentStory<typeof ModalViewer> = () => {
  const { handleAddModal } = useModal();
  const [modalList] = useRecoilState($modalState);

  return (
    <div>
      {modalList.length === 0 && (
        <>
          <Button
            onClick={() =>
              handleAddModal({
                key: ModalKey.alertModalDialog,
                props: SMS_COMPLETE,
              })
            }
          >
            SMS 발송 완료 알럿모달
          </Button>
          <Button
            onClick={() =>
              handleAddModal({
                key: ModalKey.alertModalDialog,
                props: POPUP_CLOSE,
              })
            }
          >
            팝업 닫기 알럿모달
          </Button>
        </>
      )}
      <ModalViewer />
    </div>
  );
};

export const modalViewer = Template.bind({});
