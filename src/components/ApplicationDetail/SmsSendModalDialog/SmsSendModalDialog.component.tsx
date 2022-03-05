import React from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper } from '@/components';
import * as Styled from './SmsSendModalDialog.styled';
import * as api from '@/api';
import { $applicationById, $modalByStorage, ModalKey } from '@/store';
import { request } from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';

interface FormValues {
  name: string;
  content: string;
}

export interface SmsSendModalDialogProps {
  id: string;
}

const SmsSendModalDialog = ({ id }: SmsSendModalDialogProps) => {
  const navigate = useNavigate();
  const { handleAddToast } = useToast();

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendModalDialog), {
      key: ModalKey.smsSendModalDialog,
      isOpen: false,
    });
  });

  const { handleSubmit, register } = useForm<FormValues>();

  const handleSendSms = useRecoilCallback(({ set }) => ({ content, name }: FormValues) => {
    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '발송하시겠습니까?',
        paragraph: 'SMS 발송내역에서 확인하실 수 있습니다.',
        confirmButtonLabel: '발송',
        handleClickConfirmButton: () => {
          request({
            requestFunc: async () => {
              await api.postSmsSend({ applicantIds: [Number(id)], content, name });

              $applicationById({ applicationId: id });
            },

            errorHandler: handleAddToast,
            onSuccess: () => {
              handleRemoveCurrentModal();
              handleAddToast({
                type: ToastType.success,
                message: 'SMS 발송 완료',
              });
              navigate('/sms');
            },
            onCompleted: () => {
              set($modalByStorage(ModalKey.alertModalDialog), {
                key: ModalKey.alertModalDialog,
                isOpen: false,
              });
            },
          });
        },
      },
    });
  });

  const props = {
    heading: 'SMS 발송',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '발송',
        onClick: handleSubmit(handleSendSms),
        type: 'submit',
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.SmsSendModalContainer>
        <InputField
          required
          $size="xs"
          label="발송메모"
          placeholder="내용을 입려해주세요"
          {...register('name', { required: true })}
        />
        <Styled.CustomTextarea
          required
          label="발송메세지"
          placeholder="내용을 입려해주세요"
          {...register('content', { required: true })}
        />
      </Styled.SmsSendModalContainer>
    </ModalWrapper>
  );
};

export default SmsSendModalDialog;
