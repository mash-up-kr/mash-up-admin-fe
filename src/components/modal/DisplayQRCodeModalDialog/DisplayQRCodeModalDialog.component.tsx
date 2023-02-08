import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { InputField, ModalWrapper } from '@/components';
import * as Styled from './DisplayQRCodeModalDialog.styled';
import { $modalByStorage, ModalKey } from '@/store';
import { InputSize } from '@/components/common/Input/Input.component';
import { QRCodeModalClassName } from '../CreateQRCodeModalDialog/CreateQRCodeModalDialog.component';

export interface DisplayQRCodeModalDialogProps {
  qrCodeUrl: string;
}

const DisplayQRCodeModalDialog = ({ qrCodeUrl }: DisplayQRCodeModalDialogProps) => {
  const handleQRCodeModal = useSetRecoilState($modalByStorage(ModalKey.displayQRCodeModalDialog));
  const { register } = useForm();

  const props = {
    heading: 'QR URL 복사',
    handleCloseModal: () => {
      handleQRCodeModal({
        key: ModalKey.displayQRCodeModalDialog,
        isOpen: false,
      });
    },
    isContentScroll: false,
  };

  return (
    <ModalWrapper {...props} className={QRCodeModalClassName} closeButtonHidden>
      <Styled.Wrapper>
        <Styled.URLInputLabel>
          URL
          <Styled.RequiredDot />
        </Styled.URLInputLabel>
        <InputField
          $size={InputSize.md}
          type="text"
          value={qrCodeUrl}
          disabled
          {...register(`display.qrcode.url`)}
        />
      </Styled.Wrapper>
    </ModalWrapper>
  );
};

export default DisplayQRCodeModalDialog;
