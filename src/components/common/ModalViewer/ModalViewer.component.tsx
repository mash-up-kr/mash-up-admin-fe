import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog, SmsSendModalDialog } from '@/components';
import { SmsSendModalDialogProps } from '@/components/ApplicationDetail/SmsSendModalDialog/SmsSendModalDialog.component';
import { AlertModalDialogProps } from '../AlertModalDialog/AlertModalDialog.component';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const [modal, setModal] = useRecoilState($modalByStorage(modalKey));
  const { pathname } = useLocation();

  if (modalKey === ModalKey.alertModalDialog && modal.isOpen && modal.props) {
    return <AlertModalDialog key={modalKey} {...(modal.props as AlertModalDialogProps)} />;
  }
  if (modalKey === ModalKey.smsSendModalDialog && modal.isOpen && modal.props) {
    if (!/\/application\/\d/g.test(pathname)) {
      setModal({ ...modal, isOpen: false });
    }

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
