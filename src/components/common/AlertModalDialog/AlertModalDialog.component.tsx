import React, { MouseEventHandler, MutableRefObject } from 'react';
import { ModalWrapper } from '@/components';
import * as Styled from './AlertModalDialog.styled';
import useModal from '@/hooks/useModal';
import { ModalKey } from '@/recoil/modal';

export interface AlertModalDialogProps {
  heading: string;
  paragraph: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  handleApprovalButton: MouseEventHandler<HTMLButtonElement>;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
}

const AlertModalDialog = ({
  heading,
  paragraph,
  cancelButtonLabel = '취소',
  confirmButtonLabel = '확인',
  handleApprovalButton,
}: AlertModalDialogProps) => {
  const { handleRemoveCurrentModal } = useModal();

  const props = {
    footer: {
      cancelButton: {
        label: cancelButtonLabel,
      },
      confirmButton: {
        label: confirmButtonLabel,
        onClick:
          handleApprovalButton || (() => handleRemoveCurrentModal(ModalKey.alertModalDialog)),
      },
    },
    handleCloseModal: () => handleRemoveCurrentModal(ModalKey.alertModalDialog),
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
