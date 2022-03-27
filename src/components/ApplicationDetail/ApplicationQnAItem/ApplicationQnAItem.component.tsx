import React from 'react';
import unescape from 'lodash-es/unescape';
import Linkify from 'react-linkify';
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
      {answer.content && (
        <Styled.Answer>
          <Linkify
            // eslint-disable-next-line react/no-unstable-nested-components
            componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
              <a href={decoratedHref} key={key} target="_blank" rel="noreferrer">
                {decoratedText}
              </a>
            )}
          >{`${unescape(answer.content)} http://dididy.io`}</Linkify>
        </Styled.Answer>
      )}
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
