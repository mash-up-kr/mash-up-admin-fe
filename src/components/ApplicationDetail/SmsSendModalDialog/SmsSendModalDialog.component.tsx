import React from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper } from '@/components';
import * as Styled from './SmsSendModalDialog.styled';
import * as api from '@/api';
import { $applicationById, $modalByStorage, ModalKey } from '@/store';

interface FormValues {
  name: string;
  content: string;
}

export interface SmsSendModalDialogProps {
  id: string;
}

const SmsSendModalDialog = ({ id }: SmsSendModalDialogProps) => {
  const navigate = useNavigate();

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendModalDialog), {
      key: ModalKey.smsSendModalDialog,
      isOpen: false,
    });
  });

  const { handleSubmit, register } = useForm<FormValues>();

  const handleSendSms = useRecoilCallback(
    ({ snapshot, set }) =>
      async ({ content, name }: FormValues) => {
        const smsModalSnapshot = snapshot.getLoadable(
          $modalByStorage(ModalKey.smsSendModalDialog),
        ).contents;

        const alertModalSnapshot = snapshot.getLoadable(
          $modalByStorage(ModalKey.alertModalDialog),
        ).contents;

        const handleClickButton = (isCancel: boolean) => {
          set($modalByStorage(ModalKey.smsSendModalDialog), {
            ...smsModalSnapshot,
            isOpen: false,
          });
          set($modalByStorage(ModalKey.alertModalDialog), {
            ...alertModalSnapshot,
            isOpen: false,
          });

          if (isCancel) {
            return null;
          }

          navigate('/sms');
        };

        const handleClickCancelButton = () => handleClickButton(true);
        const handleClickConfirmButton = () => handleClickButton(false);

        const MODAL_PROPS = {
          cancelButtonLabel: '취소',
          confirmButtonLabel: '이동',
          handleClickCancelButton,
          handleClickConfirmButton,
        };

        try {
          await api.postSmsSend({ applicantIds: [Number(id)], content, name });

          $applicationById({ applicationId: id });

          set($modalByStorage(ModalKey.alertModalDialog), {
            ...alertModalSnapshot,
            props: {
              ...MODAL_PROPS,
              heading: 'SMS 발송 완료',
              paragraph: 'SMS 발송내역 페이지로 이동하시겠습니까?',
            },
            isOpen: true,
          });
        } catch ({ status }) {
          set($modalByStorage(ModalKey.alertModalDialog), {
            ...alertModalSnapshot,
            props: {
              ...MODAL_PROPS,
              heading: '에러가 발생했습니다',
            },
            isOpen: true,
          });
        }
      },
  );

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
