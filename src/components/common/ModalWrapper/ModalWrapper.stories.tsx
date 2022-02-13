import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalWrapper, { ModalProps } from './ModalWrapper.component';
import { Button } from '@/components';

export default {
  title: 'ModalWrapper',
} as ComponentMeta<typeof ModalWrapper>;

export const Template: ComponentStory<typeof ModalWrapper> = (args: ModalProps) => {
  const [mount, setMount] = useState<boolean>();

  const handleCloseModal: Dispatch<SetStateAction<void>> = () => setMount(false);
  const handleSetMount: MouseEventHandler<HTMLButtonElement> = () => setMount((prev) => !prev);

  return (
    <div>
      {mount ? (
        <ModalWrapper {...args} handleCloseModal={handleCloseModal} />
      ) : (
        <Button onClick={handleSetMount} label="modal 켜기" />
      )}
    </div>
  );
};

Template.args = {
  heading: '모달 테스트',
  footer: {
    cancelButton: {
      label: '취소',
      onClick: () => {},
    },
    confirmButton: {
      label: '저장',
      onClick: () => {},
    },
  },
  handleCloseModal: () => {},
};
