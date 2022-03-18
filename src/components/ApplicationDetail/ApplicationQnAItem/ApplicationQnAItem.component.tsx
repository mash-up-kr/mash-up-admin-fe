import React from 'react';
import * as Styled from './ApplicationQnAItem.styled';
import { Question } from '@/types';

const ApplicationQnAItem = ({ content, description, maxContentLength }: Question) => {
  return (
    <Styled.ApplicationQnAItemContainer>
      <Styled.Title>{content}</Styled.Title>
      <Styled.Description>{description}</Styled.Description>
      {maxContentLength && (
        <Styled.TextLength>
          총 <strong>{description?.length}</strong>
          자/{maxContentLength}자
        </Styled.TextLength>
      )}
    </Styled.ApplicationQnAItemContainer>
  );
};

export default ApplicationQnAItem;
