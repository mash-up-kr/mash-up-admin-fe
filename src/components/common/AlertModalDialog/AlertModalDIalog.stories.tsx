import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertModalDialog, { AlertModalDialogProps } from './AlertModalDialog.component';
import { Button } from '@/components';

export default {
  title: 'AlertModalDialog',
} as ComponentMeta<typeof AlertModalDialog>;

export const Template: ComponentStory<typeof AlertModalDialog> = (args: AlertModalDialogProps) => {
  const [mount, setMount] = useState<boolean>();

  const handleCloseModal: Dispatch<SetStateAction<void>> = () => setMount(false);
  const handleSetMount: MouseEventHandler<HTMLButtonElement> = () => setMount((prev) => !prev);

  return (
    <div>
      {mount ? (
        <AlertModalDialog {...args} handleCloseModal={handleCloseModal} />
      ) : (
        <Button onClick={handleSetMount} label="modal 켜기" />
      )}
    </div>
  );
};

Template.args = {
  heading: 'SMS 발송 완료',
  paragraph: 'SMS 발송내역 페이지로 이동하시겠습니까?',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '이동',
  handleApprovalButton: () => {},
};
