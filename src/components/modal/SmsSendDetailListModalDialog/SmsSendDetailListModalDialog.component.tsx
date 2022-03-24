import React from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalWrapper } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';

const SmsSendDetailListModalDialog = () => {
  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendDetailListModalDialog), {
      key: ModalKey.smsSendDetailListModalDialog,
      isOpen: false,
    });
  });

  const props = {
    heading: '발송인원 상세 리스트',
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

export default SmsSendDetailListModalDialog;
