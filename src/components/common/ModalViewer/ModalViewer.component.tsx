import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog, ChangeResultModalDialog, SmsSendModalDialog } from '@/components';
import { AlertModalDialogProps } from '../AlertModalDialog/AlertModalDialog.component';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { SmsSendModalDialogProps } from '../SmsSendModalDialog/SmsSendModalDialog.component';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const modal = useRecoilValue($modalByStorage(modalKey));

  if (modalKey === ModalKey.alertModalDialog && modal.isOpen && modal.props) {
    return <AlertModalDialog key={modalKey} {...(modal.props as AlertModalDialogProps)} />;
  }

  if (modalKey === ModalKey.changeResultModalDialog && modal.isOpen && modal.props) {
    return (
      <ChangeResultModalDialog key={modalKey} {...(modal.props as ChangeResultModalDialogProps)} />
    );
  }

  if (modalKey === ModalKey.smsSendModalDialog && modal.isOpen && modal.props) {
    return <SmsSendModalDialog key={modalKey} {...(modal.props as SmsSendModalDialogProps)} />;
  }

  return null;
};

const ModalViewer = () => {
  const setAlertModal = useSetRecoilState($modalByStorage(ModalKey.alertModalDialog));
  const setChangeResultModal = useSetRecoilState($modalByStorage(ModalKey.changeResultModalDialog));
  const setSmsSendModal = useSetRecoilState($modalByStorage(ModalKey.smsSendModalDialog));
  const { pathname } = useLocation();

  // TODO:(용재) 추후 더 나은 방법 찾아보기..
  useEffect(() => {
    setAlertModal({ key: ModalKey.alertModalDialog, isOpen: false });
    setChangeResultModal({ key: ModalKey.changeResultModalDialog, isOpen: false });
    if (!/\/application\/\d/g.test(pathname)) {
      setSmsSendModal({ key: ModalKey.smsSendModalDialog, isOpen: false });
    }
  }, [setAlertModal, setChangeResultModal, setSmsSendModal, pathname]);

  return (
    <>
      {Object.values(ModalKey).map((each) => {
        return <Modal key={each} modalKey={each} />;
      })}
    </>
  );
};

export default ModalViewer;
