import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { ModalWrapper } from '@/components';
import * as Styled from './AlertModalDialog.styled';

export interface AlertModalDialogProps {
  heading: string;
  paragraph: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  handleApprovalButton: MouseEventHandler<HTMLButtonElement>;
  handleCloseModal: Dispatch<SetStateAction<void>>;
}

const AlertModalDialog = ({
  heading,
  paragraph,
  cancelButtonLabel = '취소',
  confirmButtonLabel = '확인',
  handleApprovalButton,
  handleCloseModal,
}: AlertModalDialogProps) => {
  const props = {
    footer: {
      cancelButton: {
        label: cancelButtonLabel,
      },
      confirmButton: {
        label: confirmButtonLabel,
        onClick: handleApprovalButton,
      },
    },
    handleCloseModal,
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
