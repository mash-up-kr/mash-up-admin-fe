import React from 'react';
import { BackButton, Input, ApplicationFormItem, CreateApplicationFormAside } from '@/components';
import * as Styled from './ApplicationFormControl.styled';
import { InputSize } from '@/components/common/Input/Input.component';
import { uuidv4 } from '@/utils/uuid';
import Plus from '@/assets/svg/plus-20.svg';

const DEFAULT_QUESTIONS = new Array(4).fill(undefined);

const ApplicationFormControl = () => {
  return (
    <Styled.ApplicationFormControlPage>
      <section>
        <BackButton label="목록 돌아가기" />
        <Styled.Headline>지원설문지 작성</Styled.Headline>
      </section>
      <div>
        <article>
          <Styled.Content>
            <Input
              $size={InputSize.md}
              label="지원설문지 문서명"
              required
              placeholder="내용을 입력해주세요"
            />
          </Styled.Content>
          <Styled.QuestionContent>
            {DEFAULT_QUESTIONS.map((_, index) => (
              <ApplicationFormItem key={uuidv4()} index={index + 1} />
            ))}
            <Styled.Divider />
            <Styled.AddButton>
              <Plus />
              <span>질문 추가</span>
            </Styled.AddButton>
          </Styled.QuestionContent>
        </article>
        <CreateApplicationFormAside />
      </div>
    </Styled.ApplicationFormControlPage>
  );
};

export default ApplicationFormControl;
