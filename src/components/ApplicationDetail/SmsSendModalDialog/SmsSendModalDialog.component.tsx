import React from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
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
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.smsSendModalDialog));

  const handleRemoveCurrentModal = () => setModal({ ...modal, isOpen: false });
  const { handleSubmit, register } = useForm<FormValues>();

  const handleSendSms = useRecoilCallback(() => async ({ content, name }: FormValues) => {
    try {
      await api.postSmsSend({ applicantIds: [Number(id)], content, name });

      $applicationById({ applicationId: id });
    } catch (e) {
      //
    }
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
    handleCloseModal: () => handleRemoveCurrentModal(),
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
