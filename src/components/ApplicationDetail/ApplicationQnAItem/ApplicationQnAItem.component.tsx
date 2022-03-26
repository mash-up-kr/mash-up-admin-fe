import React from 'react';
import unescape from 'lodash-es/unescape';
import * as Styled from './ApplicationQnAItem.styled';
import { Question, Answer } from '@/types';

export interface ApplicationQnAItemProps extends Question {
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
      <Styled.Title>{unescape(content)}</Styled.Title>
      {description && <Styled.Description>{unescape(description)}</Styled.Description>}
      {answer.content && <Styled.Answer>{unescape(answer.content)}</Styled.Answer>}
      {maxContentLength && (
        <Styled.TextLength>
          총 <strong>{unescape(answer.content).length}</strong>
          자/{maxContentLength}자
        </Styled.TextLength>
      )}
    </Styled.ApplicationQnAItemContainer>
  );
};

export default ApplicationQnAItem;
