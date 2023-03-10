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
  attendanceCheckStartedAt: string;
  attendanceCheckEndedAt: string;
  latenessCheckEndedAt: string;
}

export const QRCodeModalClassName = css`
  min-width: 38.4rem !important;
  max-width: 38.4rem !important;
  h2 {
    font-size: 24px !important;
    white-space: pre-wrap !important;
  }
`;

const CreateQRCodeModalDialog = ({
  scheduleId,
  eventId,
  sessionStartedAt,
  sessionEndedAt,
}: CreateQRCodeModalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleAddToast } = useToast();
  const methods = useForm<FormValues>({ mode: 'onChange' });
  const { register, handleSubmit, formState } = methods;
  const formValues = methods.getValues();
  const sessionStartTime = dayjs(sessionStartedAt).format('HH:mm');
  const sessionEndTime = dayjs(sessionEndedAt).format('HH:mm');

  const handleSubmitForm = useRecoilCallback(({ set }) => async (data: FormValues) => {
    const sessionDate = dayjs(sessionStartedAt).format('YYYY-MM-DDT');

    request({
      requestFunc: () => {
        setIsLoading(true);
        return api.createQRCode({
          scheduleId,
          eventId,
          attendanceCheckStartedAt: sessionDate + data.attendanceCheckStartedAt,
          attendanceCheckEndedAt: sessionDate + data.attendanceCheckEndedAt,
          latenessCheckEndedAt: sessionDate + data.latenessCheckEndedAt,
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
    heading: 'QR체크 시간을 입력해주세요',
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
        isLoading,
        disabled:
          !formValues.attendanceCheckStartedAt ||
          !formValues.attendanceCheckEndedAt ||
          !formValues.latenessCheckEndedAt ||
          !!formState.errors.attendanceCheckStartedAt?.message ||
          !!formState.errors.attendanceCheckEndedAt?.message ||
          !!formState.errors.latenessCheckEndedAt?.message,
      },
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
          출석 시작 / 마감 시간
          <Styled.RequiredDot />
        </Styled.QRTimeInputLabel>
        <Styled.InputWrapper>
          <Styled.QRTimeInput
            $size="sm"
            endIcon={<Time />}
            placeholder={sessionStartTime}
            errorMessage={formState.errors.attendanceCheckStartedAt?.message}
            {...register(`attendanceCheckStartedAt`, {
              required: true,
              pattern: {
                value: TIME_REGEX,
                message: '시간 형식을 확인하세요',
              },
            })}
          />
          <Styled.QRTimeInput
            $size="sm"
            endIcon={<Time />}
            placeholder={sessionEndTime}
            errorMessage={formState.errors.attendanceCheckEndedAt?.message}
            {...register(`attendanceCheckEndedAt`, {
              required: true,
              pattern: {
                value: TIME_REGEX,
                message: '시간 형식을 확인하세요',
              },
            })}
          />
        </Styled.InputWrapper>
        <Styled.BottomInputWrapper>
          <Styled.QRTimeInputLabel>
            지각 마감 시간
            <Styled.RequiredDot />
          </Styled.QRTimeInputLabel>
          <Styled.QRTimeInput
            $size="sm"
            endIcon={<Time />}
            placeholder={sessionStartTime}
            errorMessage={formState.errors.latenessCheckEndedAt?.message}
            {...register(`latenessCheckEndedAt`, {
              required: true,
              pattern: {
                value: TIME_REGEX,
                message: '시간 형식을 확인하세요',
              },
            })}
          />
        </Styled.BottomInputWrapper>
      </Styled.Wrapper>
    </ModalWrapper>
  );
};

export default CreateQRCodeModalDialog;
