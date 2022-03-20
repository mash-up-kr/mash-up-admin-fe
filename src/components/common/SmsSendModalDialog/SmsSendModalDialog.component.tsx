import React, { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper, TitleWithContent, Textarea } from '@/components';
import * as Styled from './SmsSendModalDialog.styled';
import * as api from '@/api';
import { $modalByStorage, ModalKey } from '@/store';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import ArrowRight from '@/assets/svg/chevron-right-16.svg';
import { request } from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '../Toast/Toast.component';
import { PATH } from '@/constants';

interface FormValues {
  name: string;
  content: string;
}

export interface SmsSendModalDialogProps {
  selectedList: number[];
  resultStatus?: ApplicationResultStatusKeyType;
  confirmationStatus?: ApplicationConfirmationStatusKeyType;
  isSendFailed?: boolean;
  messageContent?: string;
}

const SmsSendModalDialog = ({
  selectedList,
  resultStatus,
  confirmationStatus,
  isSendFailed = false,
  messageContent,
}: SmsSendModalDialogProps) => {
  const { handleAddToast } = useToast();
  const navigate = useNavigate();

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.smsSendModalDialog), {
      key: ModalKey.smsSendModalDialog,
      isOpen: false,
    });
  });

  const { setValue, handleSubmit, register } = useForm<FormValues>();

  useEffect(() => {
    if (isSendFailed && messageContent) {
      setValue('content', messageContent);
    }
  }, [isSendFailed, messageContent, setValue]);

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
              await api.postSmsSend({ applicantIds: selectedList, content, name });
            },

            errorHandler: handleAddToast,
            onSuccess: () => {
              handleRemoveCurrentModal();
              handleAddToast({
                type: ToastType.success,
                message: 'SMS 발송 완료',
              });
              navigate(PATH.SMS);
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
    heading: isSendFailed ? '실패인원 SMS 재발송' : 'SMS 발송',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '발송',
        onClick: handleSubmit(handleSendSms),
        type: 'submit',
        // TODO:(@dididy) sms 작업 완료 시 아래 라인 삭제
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.SmsSendModalContainer>
        {confirmationStatus && resultStatus && (
          <>
            <Styled.TitleArea>
              <TitleWithContent title="총 발송 인원">{selectedList.length}</TitleWithContent>
              {/* // TODO:(용재) 발송 인원 상세 리스트 모달 구현시 여는 로직 추가 */}
              {!isSendFailed && (
                <button type="button">
                  발송 인원 상세보기
                  <ArrowRight />
                </button>
              )}
            </Styled.TitleArea>
            <Styled.StatusArea isSendFailed={isSendFailed}>
              <TitleWithContent title="사용자 확인 여부">
                <ApplicationStatusBadge text={ApplicationConfirmationStatus[confirmationStatus]} />
              </TitleWithContent>
              <TitleWithContent title="합격 여부">
                <ApplicationStatusBadge text={ApplicationResultStatus[resultStatus]} />
              </TitleWithContent>
            </Styled.StatusArea>
            <Styled.Divider />
          </>
        )}
        <InputField
          required
          $size="xs"
          label="발송메모"
          placeholder="내용을 입력해주세요"
          {...register('name', { required: true })}
        />
        <Textarea
          className="textarea"
          required
          label="발송메세지"
          placeholder="내용을 입력해주세요"
          {...register('content', { required: true })}
          disabled={isSendFailed}
        />
      </Styled.SmsSendModalContainer>
    </ModalWrapper>
  );
};

export default SmsSendModalDialog;
