import React from 'react';
import * as Styled from './ApplicationQnAItem.styled';
import { Question, Answer } from '@/types';

interface ApplicationQnAItemProps extends Question {
  answer: Answer;
}

const ApplicationQnAItem = ({
  content,
  description,
  maxContentLength,
  answer,
}: ApplicationQnAItemProps) => {
  return (
    <Styled.ApplicationQnAItemContainer>
      <Styled.Title>{content}</Styled.Title>
      {description && <Styled.Description>{description}</Styled.Description>}
      {answer.content && <Styled.Answer>{answer.content}</Styled.Answer>}
      {maxContentLength && (
        <Styled.TextLength>
          총 <strong>{answer.content.length}</strong>
          자/{maxContentLength}자
        </Styled.TextLength>
      )}
    </Styled.ApplicationQnAItemContainer>
  );
};

export default ApplicationQnAItem;
