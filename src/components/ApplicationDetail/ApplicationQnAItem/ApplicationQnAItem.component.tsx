import React from 'react';
import * as Styled from './ApplicationQnAItem.styled';
import { QuestionKindType } from '@/types';

export interface ApplicationQnAItemProps {
  content: string;
  description: string;
  maxContentLength: number;
  questionId: number;
  questionType: QuestionKindType;
  required: boolean;
}

const ApplicationQnAItem = ({
  content,
  description,
  maxContentLength,
}: ApplicationQnAItemProps) => {
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
