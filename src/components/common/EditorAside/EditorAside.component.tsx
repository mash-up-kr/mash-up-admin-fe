import React, { ReactNode } from 'react';
import { Button } from '@/components';
import * as Styled from './EditorAside.styled';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { formatDate } from '@/utils';

interface ActionButton {
  text: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export interface EditorAsideProps {
  platform: ReactNode;
  rightActionButton?: ActionButton;
}

const EditorAside = ({ platform, rightActionButton }: EditorAsideProps) => {
  return (
    <Styled.EditorAside>
      <Styled.Headline>수정 정보 확인</Styled.Headline>
      <Styled.ContentContainer>
        <Styled.Label>플랫폼</Styled.Label>
        <Styled.Content>{platform}</Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>작성일시</Styled.Label>
        <Styled.Content>{formatDate(new Date(), 'YYYY년 M월 D일 A h시 m분')}</Styled.Content>
      </Styled.ContentContainer>
      <Styled.Divider />
      <Styled.ButtonContainer>
        <Button
          {...rightActionButton}
          $size={ButtonSize.sm}
          shape={ButtonShape.primary}
          label={rightActionButton?.text}
        />
      </Styled.ButtonContainer>
    </Styled.EditorAside>
  );
};

export default EditorAside;
