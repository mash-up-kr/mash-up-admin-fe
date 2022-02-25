import React from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField, ModalWrapper, TitleWithContent } from '@/components';
import * as Styled from './MultipleSmsSendModalDialog.styled';
import * as api from '@/api';
import { $modalByStorage, ModalKey } from '@/store';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import ArrowRight from '@/assets/svg/chevron-right-16.svg';

interface FormValues {
  name: string;
  content: string;
}

export interface MultipleSmsSendModalDialogProps {
  selectedList: number[];
  resultStatus: ApplicationResultStatusKeyType;
  confirmationStatus: ApplicationConfirmationStatusKeyType;
}

const MultipleSmsSendModalDialog = ({
  selectedList,
  resultStatus,
  confirmationStatus,
}: MultipleSmsSendModalDialogProps) => {
  const navigate = useNavigate();

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.multipleSmsSendModalDialog), {
      key: ModalKey.multipleSmsSendModalDialog,
      isOpen: false,
    });
  });

  const { handleSubmit, register } = useForm<FormValues>();

  const handleSendSms = useRecoilCallback(({ set }) => async ({ content, name }: FormValues) => {
    const handleClickButton = (isCancel: boolean) => {
      set($modalByStorage(ModalKey.multipleSmsSendModalDialog), {
        key: ModalKey.multipleSmsSendModalDialog,
        isOpen: false,
      });
      set($modalByStorage(ModalKey.alertModalDialog), {
        key: ModalKey.alertModalDialog,
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
      await api.postSmsSend({ applicantIds: selectedList, content, name });

      set($modalByStorage(ModalKey.alertModalDialog), {
        key: ModalKey.alertModalDialog,
        props: {
          ...MODAL_PROPS,
          heading: 'SMS 발송 완료',
          paragraph: '',
        },
        isOpen: true,
      });
    } catch ({ status }) {
      set($modalByStorage(ModalKey.alertModalDialog), {
        key: ModalKey.alertModalDialog,
        props: {
          ...MODAL_PROPS,
          heading: '에러가 발생했습니다',
        },
        isOpen: true,
      });
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
    handleCloseModal: handleRemoveCurrentModal,
  };

  return (
    <ModalWrapper {...props}>
      <Styled.SmsSendModalContainer>
        <Styled.TitleArea>
          <TitleWithContent title="총 발송 인원">{selectedList.length}</TitleWithContent>
          {/* // TODO:(용재) 발송 인원 상세 리스트 모달 구현시 여는 로직 추가 */}
          <button type="button">
            발송 인원 상세보기
            <ArrowRight />
          </button>
        </Styled.TitleArea>
        <TitleWithContent title="사용자 확인 여부">
          <ApplicationStatusBadge text={ApplicationConfirmationStatus[confirmationStatus]} />
        </TitleWithContent>
        <TitleWithContent title="합격 여부">
          <ApplicationStatusBadge text={ApplicationResultStatus[resultStatus]} />
        </TitleWithContent>
        <Styled.Divider />
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

export default MultipleSmsSendModalDialog;
