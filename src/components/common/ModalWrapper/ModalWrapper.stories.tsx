import React from 'react';
import { Story, Meta } from '@storybook/react';

import ModalWrapper from './ModalWrapper.component';

export default {
  title: 'common',
} as Meta;

export const overlay: Story<React.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <ModalWrapper
      headerText="모달 테스트"
      footer={{
        leftButton: {
          label: '취소',
          onClick: () => {},
        },
        rightButton: {
          label: '저장',
          onClick: () => {},
        },
      }}
      handleCloseModal={() => console.log('pressed')}
    />
  );
};
