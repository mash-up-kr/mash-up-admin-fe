import React from 'react';
import * as Styled from './BackButton.styled';

import ChevronLeft from '@/assets/svg/chevron-left-16.svg';

export interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const BackButton = ({ label = '목록 돌아가기', ...resetProps }: BackButtonProps) => {
  return (
    <Styled.BackButtonWrapper type="button" {...resetProps}>
      <ChevronLeft />
      {label}
    </Styled.BackButtonWrapper>
  );
};

export default BackButton;
