import React, { useMemo, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import {
  getRecruitingProgressStatusFromRecruitingPeriod,
  RecruitingProgressStatus,
  request,
} from '@/utils';
import { ModalWrapper, SelectField, TitleWithContent } from '@/components';
import * as Styled from './ChangeResultModalDialog.styled';
import * as api from '@/api';
import { $applicationById, $modalByStorage, ModalKey } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import ApplicationStatusBadge, {
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
  ApplicationResultStatusType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';

interface FormValues {
  applicationResultStatus: ApplicationResultStatusKeyType;
}

interface FormValues {
  name: string;
  content: string;
}

export interface ChangeResultModalDialogProps {
  selectedList: number[];
  selectedResults: ApplicationResultStatusKeyType[];
  refreshList?: () => void;
}

const ChangeResultModalDialog = ({
  selectedList,
  selectedResults,
  refreshList,
}: ChangeResultModalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedApplicationResultStatusRef = useRef<HTMLSelectElement>(null);
  const { handleAddToast } = useToast();
  const { setValue, handleSubmit } = useForm<FormValues>();

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.changeResultModalDialog), {
      key: ModalKey.changeResultModalDialog,
      isOpen: false,
    });
  });

  const handleSendSms = useRecoilCallback(
    ({ set, refresh }) =>
      async ({ applicationResultStatus }: FormValues) => {
        const recruitingProgressStatus = getRecruitingProgressStatusFromRecruitingPeriod(
          new Date(),
        );

        if (
          recruitingProgressStatus === RecruitingProgressStatus.PREVIOUS ||
          recruitingProgressStatus === RecruitingProgressStatus.AFTER_FIRST_SEMINAR
        ) {
          return handleAddToast({
            type: ToastType.error,
            message: '?????? ????????? ????????????.',
          });
        }

        await set($modalByStorage(ModalKey.alertModalDialog), {
          key: ModalKey.alertModalDialog,
          isOpen: true,
          props: {
            heading: '?????????????????????????',
            paragraph: '????????? ????????? ???????????? ???????????? ??? ????????????.',
            confirmButtonLabel: '??????',
            handleClickConfirmButton: () => {
              request({
                requestFunc: () => {
                  setIsLoading(true);
                  return api.postUpdateMultipleResult({
                    applicationIds: selectedList,
                    applicationResultStatus,
                  });
                },
                errorHandler: handleAddToast,
                onSuccess: () => {
                  handleRemoveCurrentModal();
                  handleAddToast({
                    type: ToastType.success,
                    message: '??????????????? ??????????????? ??????????????????.',
                  });
                  refreshList?.();
                },
                onCompleted: () => {
                  setIsLoading(false);
                  selectedList.map((each) =>
                    refresh($applicationById({ applicationId: each.toString() })),
                  );
                  set($modalByStorage(ModalKey.alertModalDialog), {
                    key: ModalKey.alertModalDialog,
                    isOpen: false,
                  });
                },
              });
            },
          },
        });
      },
  );

  const props = {
    heading: '???????????? ?????? ??????',
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
    isContentScroll: false,
  };

  const applicationResultOptions = useMemo(
    () =>
      Object.values(ApplicationResultStatus).reduce<SelectOption[]>(
        (acc: SelectOption[], cur: ApplicationResultStatusType, index) => {
          return [...acc, { value: Object.keys(ApplicationResultStatus)[index], label: cur }];
        },
        [],
      ),
    [],
  );

  const handleChangeApplicationResultSelect = (option: SelectOption) => {
    setValue(`applicationResultStatus`, option.value as ApplicationResultStatusKeyType);
  };

  return (
    <ModalWrapper {...props}>
      <Styled.ChangeResultModalContainer>
        <TitleWithContent title="????????????">{selectedList.length}</TitleWithContent>
        <Styled.SelectedResultArea title="????????? ???????????? ??????">
          {selectedResults?.map((each) => (
            <ApplicationStatusBadge key={each} text={ApplicationResultStatus[each]} />
          ))}
        </Styled.SelectedResultArea>
        <Styled.Divider> </Styled.Divider>
        <TitleWithContent title="????????? ???????????? ??????" isActive>
          <SelectField
            size={SelectSize.md}
            options={applicationResultOptions}
            isFullWidth
            ref={selectedApplicationResultStatusRef}
            onChangeOption={handleChangeApplicationResultSelect}
            defaultValue={applicationResultOptions.find((option) => option.value === 'NOT_RATED')}
          />
        </TitleWithContent>
      </Styled.ChangeResultModalContainer>
    </ModalWrapper>
  );
};

export default ChangeResultModalDialog;
