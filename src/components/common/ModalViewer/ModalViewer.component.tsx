import React from 'react';
import { useRecoilState } from 'recoil';
import { $modalByStorage, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog } from '@/components';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const [modal] = useRecoilState($modalByStorage(modalKey));
  const { hash } = window.location;

  if (
    modalKey === ModalKey.alertModalDialog &&
    modal.isOpen &&
    modal.props &&
    hash.split('#').some((each) => each === ModalKey.alertModalDialog)
  ) {
    return <AlertModalDialog key={modalKey} {...modal.props} />;
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
