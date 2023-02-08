import React, { useState } from 'react';
import { css } from '@emotion/css';
import { useForm } from 'react-hook-form';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { ModalWrapper } from '@/components';
import * as Styled from './CreateQRCodeModalDialog.styled';
import Time from '@/assets/svg/time-16.svg';
import { TIME_REGEX, request } from '@/utils';
import { $modalByStorage, ModalKey } from '@/store';
import * as api from '@/api';
import { useToast } from '@/hooks';

export interface CreateQRCodeModalDialogProps {
  scheduleId: number;
  eventId: number;
  sessionStartedAt: string;
  sessionEndedAt: string;
}

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

const CreateQRCodeMocalDialog = ({
  scheduleId,
  eventId,
  sessionStartedAt,
  sessionEndedAt,
}: CreateQRCodeModalDialogProps) => {
  const methods = useForm<FormValues>();
  const { register, handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const { handleAddToast } = useToast();
  const sessionDate = dayjs(sessionStartedAt).format('YYYY-MM-DDT');

  console.log(isLoading, sessionEndedAt);

  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: FormValues) => {
    const startedAt = sessionDate + data.startedAt;
    const endedAt = sessionDate + data.endedAt;

    request({
      requestFunc: () => {
        setIsLoading(true);
        return api.createQRCode({
          scheduleId,
          eventId,
          startedAt,
          endedAt,
        });
      },
      errorHandler: handleAddToast,
      onSuccess: ({ data: { qrCodeUrl } }) => {
        set($modalByStorage(ModalKey.displayQRCodeModalDialog), {
          key: ModalKey.displayQRCodeModalDialog,
          isOpen: true,
          props: { qrCodeUrl },
        });
      },
      onCompleted: () => {
        setIsLoading(false);
        set($modalByStorage(ModalKey.createQRCodeModalDialog), {
          key: ModalKey.createQRCodeModalDialog,
          isOpen: false,
        });
      },
    });
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
