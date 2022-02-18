import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select, { SelectOption, SelectPosition, SelectProps, SelectSize } from './Select.component';

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => {
  return <Select {...args} />;
};

const selectOptionItems: SelectOption[] = [
  {
    label: '미정',
    value: '미정',
  },
  {
    label: '서류보류중',
    value: '서류보류중',
  },
  {
    label: '서류불합격',
    value: '서류불합격',
  },
  {
    label: '서류합격',
    value: '서류합격',
  },
  {
    label: '최종보류중',
    value: '최종보류중',
  },
  {
    label: '최종불합격',
    value: '최종불합격',
  },
  {
    label: '최종합격',
    value: '최종합격',
  },
];

export const select = Template.bind({});
select.args = {
  placeholder: '전체',
  options: selectOptionItems,
  size: SelectSize.md,
  position: SelectPosition.bottom,
};

export const AlignTopSelect: ComponentStory<typeof Select> = (args: SelectProps) => {
  return (
    <div style={{ marginTop: '30rem' }}>
      <Select
        {...args}
        placeholder="전체"
        options={selectOptionItems}
        size={SelectSize.md}
        position={SelectPosition.top}
      />
    </div>
  );
};
