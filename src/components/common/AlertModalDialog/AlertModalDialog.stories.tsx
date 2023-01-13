import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertModalDialog, { AlertModalDialogProps } from './AlertModalDialog.component';

export default {
  title: 'AlertModalDialog',
} as ComponentMeta<typeof AlertModalDialog>;

const Template: ComponentStory<typeof AlertModalDialog> = (args: AlertModalDialogProps) => {
  return <AlertModalDialog {...args} />;
};

export const EmailComplete = Template.bind({});
EmailComplete.args = {
  heading: '이메일 발송 완료',
  paragraph: '이메일 발송내역 페이지로 이동하시겠습니까?',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '이동',
  handleClickConfirmButton: () => {},
};

export const PopupClose = Template.bind({});
PopupClose.args = {
  heading: '팝업을 닫으시겠습니까?',
  paragraph: '변경 또는 작성하신 데이터가 삭제됩니다.',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '닫기',
  handleClickConfirmButton: () => {},
};

export const isDelete = Template.bind({});
isDelete.args = {
  heading: '삭제하시겠습니까?',
  paragraph: '작성 또는 수정하신 데이터가 삭제됩니다.',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '닫기',
  handleClickConfirmButton: () => {},
};

export const isSave = Template.bind({});
isDelete.args = {
  heading: '저장하시겠습니까?',
  paragraph: '지원서 설문지 내역에서 확인하실 수 있습니다.',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '저장',
  handleClickConfirmButton: () => {},
};
