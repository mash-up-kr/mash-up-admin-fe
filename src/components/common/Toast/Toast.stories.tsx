import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRecoilValue } from 'recoil';
import Toast, { ToastType } from './Toast.component';
import { Button } from '@/components';
import { useToast } from '@/hooks';
import { $toast } from '@/store';

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = () => {
  const toast = useRecoilValue($toast);

  const { handleAddToast } = useToast();

  return (
    <>
      {toast && <Toast />}
      <Button
        label="토스트 띄우기"
        onClick={() =>
          handleAddToast({
            type: ToastType.success,
            message: '요청을 완료하지 못했습니다. 확인 후 다시 시도해주세요.',
          })
        }
      />
    </>
  );
};

export const toast = Template.bind({});
