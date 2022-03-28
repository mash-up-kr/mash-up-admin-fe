import React from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalWrapper } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';
import { SmsResponse } from '@/types';

export interface SmsSendDetailInfoModalDialogProps {
  sms: SmsResponse;
}

const SmsSendDetailInfoModalDialog = ({ sms }: SmsSendDetailInfoModalDialogProps) => {
  console.log(sms);
  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendDetailInfoModalDialog), {
      key: ModalKey.smsSendDetailInfoModalDialog,
      isOpen: false,
    });
  });

  const props = {
    heading: 'SMS 발송 상세내역',
    footer: {
      cancelButton: {
        label: '닫기',
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    isContentScroll: false,
  };

  // TODO: 테이블 추가
  return <ModalWrapper {...props} />;
};

export default SmsSendDetailInfoModalDialog;
