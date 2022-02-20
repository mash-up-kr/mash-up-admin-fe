import React from 'react';
import { useRecoilValue } from 'recoil';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog, SmsSendModalDialog } from '@/components';
import { SmsSendModalDialogProps } from '@/components/ApplicationDetail/SmsSendModalDialog/SmsSendModalDialog.component';
import { AlertModalDialogProps } from '../AlertModalDialog/AlertModalDialog.component';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const modal = useRecoilValue($modalByStorage(modalKey));

  if (modalKey === ModalKey.alertModalDialog && modal.isOpen && modal.props) {
    return <AlertModalDialog key={modalKey} {...(modal.props as AlertModalDialogProps)} />;
  }
  if (modalKey === ModalKey.smsSendModalDialog && modal.isOpen && modal.props) {
    return <SmsSendModalDialog key={modalKey} {...(modal.props as SmsSendModalDialogProps)} />;
  }

  return null;
};

const ModalViewer = () => {
  return (
    <>
      {Object.values(ModalKey).map((each) => {
        return <Modal key={each} modalKey={each} />;
      })}
    </>
  );
};

export default ModalViewer;
