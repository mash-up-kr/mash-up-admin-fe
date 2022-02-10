import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalWrapper, { ModalProps } from './ModalWrapper.component';

export default {
  title: 'ModalWrapper',
} as ComponentMeta<typeof ModalWrapper>;

export const Template: ComponentStory<typeof ModalWrapper> = (args: ModalProps) => {
  return <ModalWrapper {...args} />;
};

Template.args = {
  headerText: '모달 테스트',
  footer: {
    leftButton: {
      label: '취소',
      onClick: () => {},
    },
    rightButton: {
      label: '저장',
      onClick: () => {},
    },
  },
  handleCloseModal: () => {},
};
