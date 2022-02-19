import React, { ReactNode } from 'react';
import * as Styled from './TitleWithContent.styled';

export interface TitleWithContentProps {
  children: ReactNode;
  title: string;
  isLineThrough?: boolean;
  isActive?: boolean;
}

const TitleWithContent = ({
  children,
  title,
  isLineThrough = false,
  isActive = false,
}: TitleWithContentProps) => {
  return (
    <Styled.TitleWithContentWrapper>
      <Styled.Label isLineThrough={isLineThrough} isActive={isActive}>
        {title}
      </Styled.Label>
      <Styled.Content>{children}</Styled.Content>
    </Styled.TitleWithContentWrapper>
  );
};

export default TitleWithContent;
