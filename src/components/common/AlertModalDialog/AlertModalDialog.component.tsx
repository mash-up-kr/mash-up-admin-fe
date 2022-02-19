import React, { MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ModalWrapper } from '@/components';
import * as Styled from './AlertModalDialog.styled';
import { $modalByStorage, ModalKey } from '@/store';
import { Position } from '@/components/common/ModalWrapper/ModalWrapper.component';

export const SMS_COMPLETE = {
  heading: 'SMS 발송 완료',
  paragraph: 'SMS 발송내역 페이지로 이동하시겠습니까?',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '이동',
  linkTo: 'sms',
};

export const POPUP_CLOSE = {
  heading: '팝업을 닫으시겠습니까?',
  paragraph: '변경 또는 작성하신 데이터가 삭제됩니다.',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '닫기',
};

// TODO:(용재) 추후 내용 변경
export const ERROR = {
  heading: '에러가 발생했습니다.',
  paragraph: '다시 시도해주세요.',
  cancelButtonLabel: '취소',
  confirmButtonLabel: '닫기',
};

export interface AlertModalDialogProps {
  heading: string;
  paragraph: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  linkTo?: string;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
}

const AlertModalDialog = ({
  heading,
  paragraph,
  cancelButtonLabel = '취소',
  confirmButtonLabel = '확인',
  linkTo,
}: AlertModalDialogProps) => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.alertModalDialog));

  const handleRemoveCurrentModal = () => setModal({ ...modal, isOpen: false });

  const props = {
    footer: {
      cancelButton: {
        label: cancelButtonLabel,
      },
      confirmButton: {
        label: confirmButtonLabel,
        onClick: linkTo ? () => navigate(linkTo) : () => handleRemoveCurrentModal(),
      },
      position: Position.center,
    },
    handleCloseModal: () => handleRemoveCurrentModal(),
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
