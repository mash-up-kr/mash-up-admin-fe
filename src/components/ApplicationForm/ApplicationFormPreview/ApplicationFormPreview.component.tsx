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

const PRIVACY_POLICY_URL =
  'https://snow-chestnut-45b.notion.site/Mash-Up-Recruit-62a5f6dabcb34e61ba8f26c4fb3a21f0';

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
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="이름"
        placeholder="내용을 입력해주세요"
        required
      />
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="전화번호"
        placeholder="내용을 입력해주세요"
        required
      />
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="이메일"
        placeholder="mashup12th@gmail.com"
        required
        disabled
      />
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="생년월일"
        placeholder="생년월일을 입력해주세요 ex) 2000-01-15"
        required
      />
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="거주지역"
        placeholder="거주지역을 입력해주세요 ex) 서울시 강남구"
        required
      />
      <Styled.PrivacyInput
        $size={InputSize.md}
        label="소속"
        placeholder="소속을 입력해주세요 ex) 회사, 학교, 동아리, 취준생... "
      />

      <Styled.CategoryHeadline>질문목록</Styled.CategoryHeadline>
      {questions.map((question, index) => {
        const readableIndex = index + 1;

        const props = {
          key: question.questionId ?? uuidv4(),
          label: `${readableIndex}. ${question.content}`,
          description: question.description,
          required: question.required,
        };

        return question.questionType === QuestionKind.multiLineText ? (
          <>
            <Styled.QuestionTextarea {...props} />
            {question.maxContentLength && (
              <Styled.MaxContentLength>{`0/${question.maxContentLength}`}</Styled.MaxContentLength>
            )}
          </>
        ) : (
          <Styled.QuestionInput {...props} $size={InputSize.md} />
        );
      })}
      <Styled.PrivacyCheckBox
        label={
          <Styled.PrivacyCheckBoxLabel>
            <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
              개인정보 수집 및 이용
            </a>
            에 동의합니다.
          </Styled.PrivacyCheckBoxLabel>
        }
      />
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
