import React from 'react';
import { css } from '@emotion/css';
import { useForm } from 'react-hook-form';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { ModalWrapper } from '@/components';
import * as Styled from './CreateQRCodeModalDialog.styled';
import Time from '@/assets/svg/time-16.svg';
import { TIME_REGEX } from '@/utils';
import { $modalByStorage, ModalKey } from '@/store';

export interface CreateQRCodeModalDialogProps {}

interface FormValues {
  startedAt: string;
  endedAt: string;
}

export const QRCodeModalClassName = css`
  min-width: 38.4rem !important;
  max-width: 38.4rem !important;
  h2 {
    font-size: 24px !important;
    white-space: pre-wrap !important;
  }
`;

const CreateQRCodeMocalDialog = () => {
  const methods = useForm<FormValues>();
  const { register, handleSubmit } = methods;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: FormValues) => {
    console.log('submit', data);
  });

  const handleQRCodeModal = useSetRecoilState($modalByStorage(ModalKey.createQRCodeModalDialog));

  const props = {
    heading: 'QR체크 시작과 마감 시간을\n입력해주세요',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '생성',
        onClick: () => {
          handleSubmit(handleSubmitForm)();
        },
        type: 'submit',
        isLoading: false,
      },
      position: undefined,
    },
    handleCloseModal: () => {
      handleQRCodeModal({
        key: ModalKey.createQRCodeModalDialog,
        isOpen: false,
        props: {},
      });
    },
    isContentScroll: false,
  };

  return (
    <ModalWrapper {...props} className={QRCodeModalClassName} closeButtonHidden>
      <Styled.Wrapper>
        <Styled.QRTimeInputLabel>
          시작 / 마감
          <Styled.RequiredDot />
        </Styled.QRTimeInputLabel>
        <Styled.InputWrapper>
          <Styled.QRTimeInput
            $size="md"
            endIcon={<Time />}
            placeholder="13:00"
            {...register(`startedAt`, {
              required: true,
              pattern: {
                value: TIME_REGEX,
                message: '시간 형식이 올바르지 않습니다,',
              },
            })}
          />
          <Styled.QRTimeInput
            $size="md"
            endIcon={<Time />}
            placeholder="13:45"
            {...register(`endedAt`, {
              required: true,
              pattern: {
                value: TIME_REGEX,
                message: '시간 형식이 올바르지 않습니다,',
              },
            })}
          />
        </Styled.InputWrapper>
      </Styled.Wrapper>
    </ModalWrapper>
  );
};

export default CreateQRCodeMocalDialog;
