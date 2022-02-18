import React from 'react';
import { useRecoilState } from 'recoil';
import { $modal, ModalKey, ModalKeyType } from '@/store';
import { AlertModalDialog } from '@/components';

const Modal = ({ modalKey }: { modalKey: ModalKeyType }) => {
  const [modal] = useRecoilState($modal(modalKey));

  if (modalKey === ModalKey.alertModalDialog && modal.isOpen && modal.props) {
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
