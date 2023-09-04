import React, { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import { request } from '@/utils';
import { InputField, ModalWrapper, Select, TitleWithContent } from '@/components';
import * as Styled from './CreateHelperAdminMemberDialog.styled';
import * as api from '@/api';
import { $modalByStorage, ModalKey } from '@/store';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';

interface FormValues {
  platform: string;
  username: string;
  password: string;
}

export interface CreateHelperAdminMemberDialogProps {
  refreshList?: () => void;
}

const CreateHelperAdminMemberDialog = ({ refreshList }: CreateHelperAdminMemberDialogProps) => {
  const selectedPlatformRef = useRef<HTMLInputElement>(null);
  const { handleAddToast } = useToast();
  const { setValue, handleSubmit, register } = useForm<FormValues>();
  const [options, setOptions] = useState<SelectOption[]>([]);

  const getTeams = async () => {
    const { data } = await api.getTeams();
    const newOptions = data.map((i) => ({ value: i.name, label: i.name }));
    setOptions(newOptions);
    setValue('platform', newOptions[0].value);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleRemoveCurrentModal = useRecoilCallback(({ set }) => () => {
    set($modalByStorage(ModalKey.createHelperAdminMemberDialog), {
      key: ModalKey.createHelperAdminMemberDialog,
      isOpen: false,
    });
  });

  const handleSendEmail = useRecoilCallback(
    () =>
      ({ username, platform, password }: FormValues) => {
        request({
          requestFunc: async () => {
            await api.createAdminMember({
              username,
              platform,
              password,
            });
          },
          onSuccess: () => {
            handleAddToast({
              type: ToastType.success,
              message: '성공적으로 생성되었습니다.',
            });
            handleRemoveCurrentModal();
            refreshList?.();
          },
          errorHandler: handleAddToast,
        });
      },
  );

  const props = {
    heading: '헬퍼 생성',
    footer: {
      cancelButton: {
        label: '취소',
      },
      confirmButton: {
        label: '생성',
        onClick: handleSubmit(handleSendEmail),
        type: 'submit',
      },
    },
    handleCloseModal: handleRemoveCurrentModal,
    isContentScroll: false,
  };

  const handleChangePlatformSelect = (option: SelectOption) => {
    setValue('platform', option.value);
  };

  return (
    <ModalWrapper {...props}>
      <Styled.ChangeResultModalContainer>
        <TitleWithContent title="플랫폼" isActive>
          <Select
            size={SelectSize.md}
            options={options}
            isFullWidth
            ref={selectedPlatformRef}
            onChangeOption={handleChangePlatformSelect}
            defaultValue={options[0]}
          />
        </TitleWithContent>
        <InputField
          required
          $size="md"
          label="이름"
          placeholder="내용을 입력해주세요"
          {...register('username', { required: true })}
        />
        <InputField
          required
          $size="md"
          label="비밀번호"
          placeholder="내용을 입력해주세요"
          {...register('password', { required: true })}
        />
      </Styled.ChangeResultModalContainer>
    </ModalWrapper>
  );
};

export default CreateHelperAdminMemberDialog;
