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
    label: '미검토',
    value: '미검토',
  },
  {
    label: '서류 보류',
    value: '서류 보류',
  },
  {
    label: '서류 불합격',
    value: '서류 불합격',
  },
  {
    label: '서류 합격',
    value: '서류 합격',
  },
  {
    label: '최종 불합격',
    value: '최종 불합격',
  },
  {
    label: '최종 보류',
    value: '최종 보류',
  },
  {
    label: '최종 합격',
    value: '최종 합격',
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
        disabled
        position={SelectPosition.top}
      />
    </div>
  );
};
