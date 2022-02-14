import React from 'react';
import { useRecoilState } from 'recoil';
import { $modalState, ModalKey } from '@/recoil';
import { AlertModalDialog } from '@/components';

const ModalViewer = () => {
  const [modalList] = useRecoilState($modalState);

  return (
    <div>
      {modalList.map(({ key, props }) => {
        if (key === ModalKey.alertModalDialog) {
          return <AlertModalDialog key={key} {...props} />;
        }
        return null;
      })}
    </div>
  );
};

export default ModalViewer;
