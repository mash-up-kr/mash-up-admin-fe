import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as Styled from './ApplicationFormItem.styled';
import { InputSize } from '@/components/common/Input/Input.component';
import { Input, InputField, Select, Textarea, ToggleButton, ToggleButtonField } from '@/components';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import TrashCan from '@/assets/svg/trash-can-36.svg';
import { Question, QuestionKindType, QuestionKind } from '@/types/dto/applicationForm';
import { useToggleState } from '@/hooks';

interface FormValues {
  title: string;
  questions: Question[];
}

export interface ApplicationFormItemProps {
  index: number;
  handleRemoveItem: (index: number) => void;
}

const options: SelectOption[] = [
  {
    label: '장문형',
    value: QuestionKind.multiLineText,
  },
  {
    label: '단답형',
    value: QuestionKind.singleLineText,
  },
];

const ApplicationFormItem = ({ index, handleRemoveItem }: ApplicationFormItemProps) => {
  const { register, setValue, watch } = useFormContext<FormValues>();

  const [hasMaxContentLength, toggleMaxContentLength] = useToggleState(false);

  const questionType = watch(`questions.${index}.questionType`);

  const readableIndex = index + 1;

  const handleChangeSelect = (option: SelectOption) => {
    setValue(`questions.${index}.questionType`, option.value as QuestionKindType);
  };

  return (
    <Styled.ApplicationFormItemContainer>
      <Styled.Col>
        <Styled.ApplicationFormItemIndex>{readableIndex}.</Styled.ApplicationFormItemIndex>
        <Styled.ApplicationFormItemQuestionInput
          {...register(`questions.${index}.content`, { required: true })}
          $size={InputSize.md}
          placeholder="질문 제목을 입력해주세요."
        />
      </Styled.Col>

      <Styled.Col>
        <InputField
          $size={InputSize.xs}
          {...register(`questions.${index}.description`)}
          placeholder="설명을 입력해주세요(선택사항입니다.)"
        />
      </Styled.Col>

      <Styled.Col>
        {questionType === QuestionKind.multiLineText ? (
          <Textarea placeholder="장문형 텍스트입니다." disabled />
        ) : (
          <Input $size={InputSize.md} placeholder="장문형 텍스트입니다." disabled />
        )}
      </Styled.Col>
      <Styled.Col>
        <Select size={SelectSize.xs} options={options} onChange={handleChangeSelect} />
        {questionType === QuestionKind.multiLineText && (
          <Styled.MaxContentSizeContainer>
            <ToggleButton isChecked={hasMaxContentLength} handleToggle={toggleMaxContentLength} />
            <span>글자수 제한</span>
            {hasMaxContentLength && (
              <InputField
                $size={InputSize.xs}
                {...register(`questions.${index}.maxContentLength`)}
              />
            )}
          </Styled.MaxContentSizeContainer>
        )}
        <Styled.IconButton>
          <TrashCan onClick={() => handleRemoveItem(index)} />
        </Styled.IconButton>
        <Styled.Divider />
        <Styled.RequiredContainer>
          <span>필수</span>
          <ToggleButtonField {...register(`questions.${index}.required`)} />
        </Styled.RequiredContainer>
      </Styled.Col>
    </Styled.ApplicationFormItemContainer>
  );
};

export default ApplicationFormItem;
