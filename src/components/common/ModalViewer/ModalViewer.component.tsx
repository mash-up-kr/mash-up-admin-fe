import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog, SmsSendModalDialog } from '@/components';
import { SmsSendModalDialogProps } from '@/components/ApplicationDetail/SmsSendModalDialog/SmsSendModalDialog.component';
import { AlertModalDialogProps } from '../AlertModalDialog/AlertModalDialog.component';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const modal = useRecoilValue($modalByStorage(modalKey));
  // const { hash } = window.location;

  if (modalKey === ModalKey.alertModalDialog && modal.isOpen && modal.props) {
    return <AlertModalDialog key={modalKey} {...(modal.props as AlertModalDialogProps)} />;
  }
  if (modalKey === ModalKey.smsSendModalDialog && modal.isOpen && modal.props) {
    return <SmsSendModalDialog key={modalKey} {...(modal.props as SmsSendModalDialogProps)} />;
  }

  return null;
};

const ModalViewer = () => {
  const setModal = useSetRecoilState($modalByStorage(ModalKey.alertModalDialog));

  // TODO:(용재) 추후 더 나은 방법 찾아보기..
  useEffect(() => {
    setModal({ key: ModalKey.alertModalDialog, isOpen: false });
  }, [setModal]);

  return (
    <>
      {Object.values(ModalKey).map((each) => {
        return <Modal key={each} modalKey={each} />;
      })}
    </>
  );
};

export default ModalViewer;
