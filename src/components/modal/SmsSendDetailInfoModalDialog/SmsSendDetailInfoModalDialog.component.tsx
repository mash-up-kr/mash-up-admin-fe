import React from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalWrapper } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';

const SmsSendDetailInfoModalDialog = () => {
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
