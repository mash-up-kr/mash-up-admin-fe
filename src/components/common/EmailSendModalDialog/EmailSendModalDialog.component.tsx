import React, { useState } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper, RadioButtonField, TitleWithContent } from '@/components';
import * as Styled from './EmailSendModalDialog.styled';
import * as api from '@/api';
import { $modalByStorage, ModalKey } from '@/store';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import ArrowRight from '@/assets/svg/chevron-right-16.svg';
import { request, uniqArray } from '@/utils';
import { useRefreshSelectorFamilyByKey, useToast } from '@/hooks';
import { ToastType } from '../Toast/Toast.component';
import { PATH } from '@/constants';
import {
  ApplicationResponse,
  EmailRequest,
  EmailTypes,
  TemplateName,
  TemplateNames,
} from '@/types';

interface FormValues {
  memo: string;
  templateName: TemplateName;
}

export interface EmailSendModalDialogProps {
  selectedApplications: ApplicationResponse[];
  isSendFailed?: boolean;
  showSummary?: boolean;
  failedEmailRequests?: EmailRequest[];
}

const EmailSendModalDialog = ({
  selectedApplications,
  isSendFailed = false,
  showSummary = false,
  failedEmailRequests = [],
}: EmailSendModalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedApplicationIds = selectedApplications.map(
    (application) => application.applicationId,
  );

  const selectedFailedApplicationIds = failedEmailRequests.map(
    ({ applicationId }) => applicationId,
  );

  const selectedResults = uniqArray(
    selectedApplications.map((application) => application.result.status),
  ) as ApplicationResultStatusKeyType[];
  const selectedConfirmStatuses = uniqArray(
    selectedApplications.map((application) => application.confirmationStatus),
  ) as ApplicationConfirmationStatusKeyType[];

  const { handleAddToast } = useToast();
  const navigate = useNavigate();
  const setEmailSendDetailListModal = useSetRecoilState(
    $modalByStorage(ModalKey.emailSendDetailListModalDialog),
  );
  const refreshSelectorFamilyByKey = useRefreshSelectorFamilyByKey();

  const handleOpenEmailSendDetailListModalDialog = () => {
    setEmailSendDetailListModal({
      key: ModalKey.emailSendDetailListModalDialog,
      props: {
        selectedApplications,
      },
      isOpen: true,
    });
  };

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.emailSendModalDialog), {
      key: ModalKey.emailSendModalDialog,
      isOpen: false,
    });
  });

  const { handleSubmit, register } = useForm<FormValues>();

  const handleSendEmail = useRecoilCallback(({ set }) => ({ memo, templateName }: FormValues) => {
    set($modalByStorage(ModalKey.alertModalDialog), {
      key: ModalKey.alertModalDialog,
      isOpen: true,
      props: {
        heading: '발송하시겠습니까?',
        paragraph: '이메일 발송내역에서 확인하실 수 있습니다.',
        confirmButtonLabel: '발송',
        handleClickConfirmButton: () => {
          request({
            requestFunc: async () => {
              setIsLoading(true);

              await api.postEmailSend({
                applicationIds: isSendFailed
                  ? selectedFailedApplicationIds
                  : selectedApplicationIds,
                memo,
                templateName,
              });
            },

            errorHandler: handleAddToast,
            onSuccess: () => {
              handleRemoveCurrentModal();
              handleAddToast({
                type: ToastType.success,
                message: '이메일 발송 완료',
              });
              navigate(PATH.EMAIL);
            },
            onCompleted: () => {
              setIsLoading(false);
              set($modalByStorage(ModalKey.alertModalDialog), {
                key: ModalKey.alertModalDialog,
                isOpen: false,
              });
              refreshSelectorFamilyByKey('emailSendingList');
            },
          });
        },
      },
    });
  });

  const props = {
    heading: isSendFailed ? '실패인원 이메일 재발송' : '이메일 발송',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '발송',
        onClick: handleSubmit(handleSendEmail),
        type: 'submit',
        isLoading,
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    closeOnClickOverlay: false,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.EmailSendModalContainer>
        {showSummary && (
          <>
            <Styled.TitleArea>
              <TitleWithContent title="총 발송 인원">
                {selectedApplicationIds.length}
              </TitleWithContent>
              {!isSendFailed && (
                <button type="button" onClick={handleOpenEmailSendDetailListModalDialog}>
                  발송 인원 상세보기
                  <ArrowRight />
                </button>
              )}
            </Styled.TitleArea>
            {!isSendFailed && (
              <Styled.TitleArea>
                <TitleWithContent title="발송이메일">recruit.mashup@gmail.com</TitleWithContent>
              </Styled.TitleArea>
            )}
            <Styled.StatusArea isSendFailed={isSendFailed}>
              <TitleWithContent title="사용자 확인 여부">
                {selectedConfirmStatuses?.map((each) => (
                  <ApplicationStatusBadge key={each} text={ApplicationConfirmationStatus[each]} />
                ))}
              </TitleWithContent>
              <TitleWithContent title="합격 여부">
                {selectedResults?.map((each) => (
                  <ApplicationStatusBadge key={each} text={ApplicationResultStatus[each]} />
                ))}
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
          {...register('memo', { required: true })}
        />
        <Styled.Label>
          발송유형
          <Styled.RequiredDot />
        </Styled.Label>
        {Object.values(EmailTypes).map(
          (emailType) =>
            TemplateNames[emailType] !== 'SUBMIT' && (
              <RadioButtonField
                key={emailType}
                label={emailType}
                value={TemplateNames[emailType]}
                {...register('templateName', { required: true })}
              />
            ),
        )}
      </Styled.EmailSendModalContainer>
    </ModalWrapper>
  );
};

export default EmailSendModalDialog;
