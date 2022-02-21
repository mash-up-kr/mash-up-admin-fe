import React, { MouseEventHandler, MutableRefObject } from 'react';
import { useRecoilState } from 'recoil';
import { ModalWrapper } from '@/components';
import * as Styled from './AlertModalDialog.styled';
import { $modalByStorage, ModalKey } from '@/store';
import { Position } from '@/components/common/ModalWrapper/ModalWrapper.component';

export interface AlertModalDialogProps {
  heading: string;
  paragraph: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  linkTo?: string;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
  handleClickCancelButton?: MouseEventHandler<HTMLButtonElement>;
  handleClickConfirmButton?: MouseEventHandler<HTMLButtonElement>;
}

const AlertModalDialog = ({
  heading,
  paragraph,
  cancelButtonLabel = '취소',
  confirmButtonLabel = '확인',
  handleClickCancelButton,
  handleClickConfirmButton,
}: AlertModalDialogProps) => {
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.alertModalDialog));

  const handleRemoveCurrentModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModal({ ...modal, isOpen: false });
  };

  const props = {
    footer: {
      cancelButton: {
        label: cancelButtonLabel,
        onClick: handleClickCancelButton || handleRemoveCurrentModal,
      },
      confirmButton: {
        label: confirmButtonLabel,
        onClick: handleClickConfirmButton || handleRemoveCurrentModal,
      },
      position: Position.center,
    },
    handleCloseModal: handleClickCancelButton || handleRemoveCurrentModal,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.AlertModalDialogWrapper>
        <Styled.AlertModalDialogHeader>{heading}</Styled.AlertModalDialogHeader>
        <Styled.AlertModalDialogContent>{paragraph}</Styled.AlertModalDialogContent>
      </Styled.AlertModalDialogWrapper>
    </ModalWrapper>
  );
};

export default AlertModalDialog;
