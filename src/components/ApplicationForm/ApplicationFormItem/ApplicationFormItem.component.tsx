import React, { useState } from 'react';
import * as Styled from './ApplicationFormItem.styled';
import { InputSize } from '@/components/common/Input/Input.component';
import { Select, Textarea, ToggleButton } from '@/components';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import TrashCan from '@/assets/svg/trash-can-36.svg';

export interface ApplicationFormItemProps {
  index: number;
}

const options: SelectOption[] = [
  {
    label: '장문형',
    value: 'sentence',
  },
  {
    label: '단답형',
    value: 'short',
  },
];

const ApplicationFormItem = ({ index }: ApplicationFormItemProps) => {
  const [value, setValue] = useState('short');

  return (
    <Styled.ApplicationFormItemContainer>
      <Styled.Col>
        <Styled.ApplicationFormItemIndex>{index}.</Styled.ApplicationFormItemIndex>
        <Styled.ApplicationFormItemQuestionInput id="123" $size={InputSize.md} label="" />
      </Styled.Col>

      <Styled.Col>
        <Textarea id="" label="" placeholder="장문형 텍스트입니다." />
      </Styled.Col>
      <Styled.Col>
        <Select size={SelectSize.xs} value={value} options={options} setValue={setValue} />
        <Styled.MaxContentSizeContainer>
          <ToggleButton />
          <span>글자수 제한</span>
        </Styled.MaxContentSizeContainer>
        <Styled.IconButton>
          <TrashCan />
        </Styled.IconButton>
        <Styled.Divider />
        <Styled.RequiredContainer>
          <span>필수</span>
          <ToggleButton />
        </Styled.RequiredContainer>
      </Styled.Col>
    </Styled.ApplicationFormItemContainer>
  );
};

export default ApplicationFormItem;
