import React, { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper, TitleWithContent, Textarea } from '@/components';
import * as Styled from './SmsSendModalDialog.styled';
import * as api from '@/api';
import { $me, $modalByStorage, ModalKey } from '@/store';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import ArrowRight from '@/assets/svg/chevron-right-16.svg';
import { request, uniqArray } from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '../Toast/Toast.component';
import { PATH } from '@/constants';
import { ApplicationResponse } from '@/types';

interface FormValues {
  name: string;
  content: string;
}

export interface SmsSendModalDialogProps {
  selectedApplications: ApplicationResponse[];
  isSendFailed?: boolean;
  messageContent?: string;
  showSummary?: boolean;
}

const SmsSendModalDialog = ({
  selectedApplications,
  isSendFailed = false,
  messageContent,
  showSummary = false,
}: SmsSendModalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedIds = selectedApplications.map((application) => application.applicant.applicantId);
  const selectedResults = uniqArray(
    selectedApplications.map((application) => application.result.status),
  ) as ApplicationResultStatusKeyType[];
  const selectedConfirmStatuses = uniqArray(
    selectedApplications.map((application) => application.confirmationStatus),
  ) as ApplicationConfirmationStatusKeyType[];

  const { handleAddToast } = useToast();
  const navigate = useNavigate();
  const { adminMember } = useRecoilValue($me);
  const setSmsSendDetailListModal = useSetRecoilState(
    $modalByStorage(ModalKey.smsSendDetailListModalDialog),
  );

  const handleOpenSmsSendDetailListModalDialog = () => {
    setSmsSendDetailListModal({
      key: ModalKey.smsSendDetailListModalDialog,
      props: {
        selectedApplications,
      },
      isOpen: true,
    });
  };

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
        heading: '?????????????????????????',
        paragraph: 'SMS ?????????????????? ???????????? ??? ????????????.',
        confirmButtonLabel: '??????',
        handleClickConfirmButton: () => {
          request({
            requestFunc: async () => {
              setIsLoading(true);
              await api.postSmsSend({ applicantIds: selectedIds, content, name });
            },

            errorHandler: handleAddToast,
            onSuccess: () => {
              handleRemoveCurrentModal();
              handleAddToast({
                type: ToastType.success,
                message: 'SMS ?????? ??????',
              });
              navigate(PATH.SMS);
            },
            onCompleted: () => {
              setIsLoading(false);
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
    heading: isSendFailed ? '???????????? SMS ?????????' : 'SMS ??????',
    footer: {
      cancelButton: {
        label: '??????',
      },
      confirmButton: {
        label: '??????',
        onClick: handleSubmit(handleSendSms),
        type: 'submit',
        isLoading,
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    closeOnClickOverlay: false,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.SmsSendModalContainer>
        {showSummary && (
          <>
            <Styled.TitleArea>
              <TitleWithContent title="??? ?????? ??????">{selectedIds.length}</TitleWithContent>
              {!isSendFailed && (
                <button type="button" onClick={handleOpenSmsSendDetailListModalDialog}>
                  ?????? ?????? ????????????
                  <ArrowRight />
                </button>
              )}
            </Styled.TitleArea>
            {!isSendFailed && (
              <Styled.TitleArea>
                <TitleWithContent title="????????????">{adminMember.phoneNumber}</TitleWithContent>
              </Styled.TitleArea>
            )}
            <Styled.StatusArea isSendFailed={isSendFailed}>
              <TitleWithContent title="????????? ?????? ??????">
                {selectedConfirmStatuses?.map((each) => (
                  <ApplicationStatusBadge key={each} text={ApplicationConfirmationStatus[each]} />
                ))}
              </TitleWithContent>
              <TitleWithContent title="?????? ??????">
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
          label="????????????"
          placeholder="????????? ??????????????????"
          {...register('name', { required: true })}
        />
        <Textarea
          className="textarea"
          required
          label="???????????????"
          placeholder="????????? ??????????????????"
          {...register('content', { required: true })}
          disabled={isSendFailed}
        />
      </Styled.SmsSendModalContainer>
    </ModalWrapper>
  );
};

export default SmsSendModalDialog;
