import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRecoilState } from 'recoil';
import useModal from '@/hooks/useModal';
import ModalViewer from './ModalViewer.component';
import { Button } from '@/components';
import { $modalState, ModalKey } from '@/recoil/modal';

export default {
  title: 'ModalViewer',
} as ComponentMeta<typeof ModalViewer>;

export const Template: ComponentStory<typeof ModalViewer> = () => {
  const { handleAddModal } = useModal();
  const [modalList] = useRecoilState($modalState);

  return (
    <div>
      {modalList.length === 0 && (
        <Button
          onClick={() =>
            handleAddModal({
              key: ModalKey.alertModalDialog,
              props: {
                heading: 'SMS 발송 완료',
                paragraph: 'SMS 발송내역 페이지로 이동하시겠습니까?',
                handleApprovalButton: () => {},
              },
            })
          }
          label="AlertModalDialog 켜기"
        />
      )}
      <ModalViewer />
    </div>
  );
};
