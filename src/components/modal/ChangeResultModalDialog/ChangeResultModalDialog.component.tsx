import React, { useMemo, useRef } from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { ModalWrapper, SelectField, TitleWithContent } from '@/components';
import * as Styled from './ChangeResultModalDialog.styled';
import * as api from '@/api';
import { $modalByStorage, ModalKey } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import ApplicationStatusBadge, {
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
  ApplicationResultStatusType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';

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
}

const ChangeResultModalDialog = ({
  selectedList,
  selectedResults,
}: ChangeResultModalDialogProps) => {
  const selectedApplicationResultStatusRef = useRef<HTMLSelectElement>(null);
  const { setValue } = useForm<FormValues>();
  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.changeResultModalDialog), {
      key: ModalKey.changeResultModalDialog,
      isOpen: false,
    });
  });

  const { handleSubmit } = useForm<FormValues>();

  const handleSendSms = useRecoilCallback(
    ({ set }) =>
      async ({ applicationResultStatus }: FormValues) => {
        const handleClickButton = () => {
          set($modalByStorage(ModalKey.changeResultModalDialog), {
            key: ModalKey.changeResultModalDialog,
            isOpen: false,
          });
          set($modalByStorage(ModalKey.alertModalDialog), {
            key: ModalKey.alertModalDialog,
            isOpen: false,
          });
        };

        const MODAL_PROPS = {
          cancelButtonLabel: '취소',
          confirmButtonLabel: '이동',
          handleClickCancelButton: handleClickButton,
          handleClickConfirmButton: handleClickButton,
        };

        try {
          await api.postUpdateMultipleResult({
            applicationIds: selectedList,
            applicationResultStatus,
          });

          set($modalByStorage(ModalKey.alertModalDialog), {
            key: ModalKey.alertModalDialog,
            props: {
              ...MODAL_PROPS,
              heading: '합격 여부 변경 완료',
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
      },
  );

  const props = {
    heading: '합격 여부 상태 변경',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '변경',
        onClick: handleSubmit(handleSendSms),
        type: 'submit',
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
        <TitleWithContent title="선택인원">{selectedList.length}</TitleWithContent>
        <Styled.SelectedResultArea title="선택된 합격 여부 상태">
          {selectedResults?.map((each) => (
            <ApplicationStatusBadge key={each} text={ApplicationResultStatus[each]} />
          ))}
        </Styled.SelectedResultArea>
        <Styled.Divider> </Styled.Divider>
        <TitleWithContent title="변경할 합격 여부 상태" isActive>
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
