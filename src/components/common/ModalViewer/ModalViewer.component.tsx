import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import {
  AlertModalDialog,
  ChangeResultModalDialog,
  EmailSendDetailInfoModalDialog,
  EmailSendDetailListModalDialog,
  EmailSendModalDialog,
  ApplyActivityScoreModalDialog,
  ActivityScoreModalDialog,
  CreateQRCodeModalDialog,
  DisplayQRCodeModalDialog,
} from '@/components';
import { AlertModalDialogProps } from '../AlertModalDialog/AlertModalDialog.component';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { EmailSendModalDialogProps } from '../EmailSendModalDialog/EmailSendModalDialog.component';
import { EmailSendDetailListModalDialogProps } from '../../modal/EmailSendDetailListModalDialog/EmailSendDetailListModalDialog.component';
import { EmailSendDetailInfoModalDialogProps } from '@/components/modal/EmailSendDetailInfoModalDialog/EmailSendDetailInfoModalDialog.component';
import { ApplyActivityScoreModalDialogProps } from '@/components/modal/ApplyActivityScoreModalDialog/ApplyActivityScoreModalDialog.component';
import { ActivityScoreModalDialogProps } from '@/components/modal/ActivityScoreModalDialog/ActivityScoreModalDialog.component';
import { CreateQRCodeModalDialogProps } from '@/components/modal/CreateQRCodeModalDialog/CreateQRCodeModalDialog.component';
import { DisplayQRCodeModalDialogProps } from '@/components/modal/DisplayQRCodeModalDialog/DisplayQRCodeModalDialog.component';

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

  if (modalKey === ModalKey.emailSendModalDialog && modal.isOpen && modal.props) {
    return <EmailSendModalDialog key={modalKey} {...(modal.props as EmailSendModalDialogProps)} />;
  }

  if (modalKey === ModalKey.emailSendDetailListModalDialog && modal.isOpen && modal.props) {
    return (
      <EmailSendDetailListModalDialog
        key={modalKey}
        {...(modal.props as EmailSendDetailListModalDialogProps)}
      />
    );
  }

  if (modalKey === ModalKey.emailSendDetailInfoModalDialog && modal.isOpen && modal.props) {
    return (
      <EmailSendDetailInfoModalDialog
        key={modalKey}
        {...(modal.props as EmailSendDetailInfoModalDialogProps)}
      />
    );
  }

  if (modalKey === ModalKey.applyActivityScoreModalDialog && modal.isOpen && modal.props) {
    return (
      <ApplyActivityScoreModalDialog
        key={modalKey}
        {...(modal.props as ApplyActivityScoreModalDialogProps)}
      />
    );
  }

  if (modalKey === ModalKey.activityScoreModalDialog && modal.isOpen && modal.props) {
    return (
      <ActivityScoreModalDialog
        key={modalKey}
        {...(modal.props as ActivityScoreModalDialogProps)}
      />
    );
  }

  if (modalKey === ModalKey.createQRCodeModalDialog && modal.isOpen && modal.props) {
    return (
      <CreateQRCodeModalDialog key={modalKey} {...(modal.props as CreateQRCodeModalDialogProps)} />
    );
  }

  if (modalKey === ModalKey.displayQRCodeModalDialog && modal.isOpen && modal.props) {
    return (
      <DisplayQRCodeModalDialog
        key={modalKey}
        {...(modal.props as DisplayQRCodeModalDialogProps)}
      />
    );
  }

  return null;
};

const ModalViewer = () => {
  const setAlertModal = useSetRecoilState($modalByStorage(ModalKey.alertModalDialog));
  const setChangeResultModal = useSetRecoilState($modalByStorage(ModalKey.changeResultModalDialog));
  const setEmailSendModal = useSetRecoilState($modalByStorage(ModalKey.emailSendModalDialog));
  const setEmailSendDetailListModal = useSetRecoilState(
    $modalByStorage(ModalKey.emailSendDetailListModalDialog),
  );
  const setEmailSendDetailInfoModal = useSetRecoilState(
    $modalByStorage(ModalKey.emailSendDetailInfoModalDialog),
  );

  const { pathname } = useLocation();

  // TODO:(용재) 추후 더 나은 방법 찾아보기..
  useEffect(() => {
    setAlertModal({ key: ModalKey.alertModalDialog, isOpen: false });
    setChangeResultModal({ key: ModalKey.changeResultModalDialog, isOpen: false });
    if (!/\/application\/\d/g.test(pathname)) {
      setEmailSendModal({ key: ModalKey.emailSendModalDialog, isOpen: false });
    }
    setEmailSendDetailListModal({
      key: ModalKey.emailSendDetailListModalDialog,
      isOpen: false,
    });
    setEmailSendDetailInfoModal({
      key: ModalKey.emailSendDetailInfoModalDialog,
      isOpen: false,
    });
  }, [
    setAlertModal,
    setChangeResultModal,
    setEmailSendModal,
    pathname,
    setEmailSendDetailListModal,
    setEmailSendDetailInfoModal,
  ]);

  return (
    <>
      {Object.values(ModalKey).map((each) => {
        return <Modal key={each} modalKey={each} />;
      })}
    </>
  );
};

export default ModalViewer;
