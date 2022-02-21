import React from 'react';
import { useFormContext } from 'react-hook-form';
import Preview from '@/assets/svg/preview-20.svg';
import { Button } from '@/components';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import * as Styled from './ApplicationFormPreview.styled';
import { InputSize } from '@/components/common/Input/Input.component';
import { useToggleState } from '@/hooks';
import { Question, QuestionKind } from '@/types';
import { uuidv4 } from '@/utils/uuid';

interface ApplicationFormPreviewModalProps {
  questions: Question[];
  toggleModalOpened: () => void;
}

interface FormValues {
  questions: Question[];
}

export const ApplicationFormPreviewModal = ({
  questions,
  toggleModalOpened,
}: ApplicationFormPreviewModalProps) => (
  <Styled.CustomModalWrapper
    heading="지원설문지 미리보기"
    handleCloseModal={toggleModalOpened}
    footer={{
      cancelButton: {
        label: '닫기',
        onClick: toggleModalOpened,
      },
    }}
  >
    <Styled.ApplicationFormPreview>
      <Styled.CategoryHeadline>개인정보</Styled.CategoryHeadline>
      <Styled.CustomInput
        $size={InputSize.md}
        label="이름"
        placeholder="내용을 입력해주세요"
        required
      />
      <Styled.CustomInput
        $size={InputSize.md}
        label="전화번호"
        placeholder="내용을 입력해주세요"
        required
      />
      <Styled.CustomInput
        $size={InputSize.md}
        label="이메일"
        placeholder="mashup12th@gmail.com"
        required
        disabled
      />
      <Styled.Description>이메일 수정은 마이페이지에서 가능합니다.</Styled.Description>
      <Styled.CategoryHeadline>질문목록</Styled.CategoryHeadline>
      {questions.map((question) => {
        const props = {
          key: question.questionId ?? uuidv4(),
          label: question.content,
          description: question.description,
        };

        return question.questionType === QuestionKind.multiLineText ? (
          <>
            <Styled.CustomTextarea {...props} />
            {question.maxContentLength && (
              <Styled.MaxContentLength>{`0/${question.maxContentLength}`}</Styled.MaxContentLength>
            )}
          </>
        ) : (
          <Styled.CustomInput {...props} $size={InputSize.md} />
        );
      })}
      {/* TODO:(@mango906): 개인정보 수집 링크 생기면 링크 걸어주기 */}
      <Styled.PrivacyCheckBox label="개인정보 수집 및 이용에 동의합니다." />
      <Styled.ButtonContainer>
        <Styled.Col>
          <Button
            $size={ButtonSize.lg}
            shape={ButtonShape.primaryLine}
            label="임시저장하기"
            type="button"
          />
          <Button
            $size={ButtonSize.lg}
            shape={ButtonShape.primary}
            label="제출하기"
            type="button"
          />
        </Styled.Col>
        <Button
          $size={ButtonSize.lg}
          shape={ButtonShape.defaultLine}
          label="목록으로 돌아가기"
          type="button"
        />
      </Styled.ButtonContainer>
    </Styled.ApplicationFormPreview>
  </Styled.CustomModalWrapper>
);

const ApplicationFormPreview = () => {
  const [modalOpened, toggleModalOpened] = useToggleState(false);

  const { getValues } = useFormContext<FormValues>();

  const questions = getValues('questions');

  return (
    <>
      <Button
        Icon={Preview}
        $size={ButtonSize.sm}
        shape={ButtonShape.defaultLine}
        label="미리보기"
        onClick={toggleModalOpened}
      />
      {modalOpened && (
        <ApplicationFormPreviewModal questions={questions} toggleModalOpened={toggleModalOpened} />
      )}
    </>
  );
};

export default ApplicationFormPreview;
