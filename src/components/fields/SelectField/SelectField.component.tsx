import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { Select } from '@/components';
import { SelectProps } from '@/components/common/Select/Select.component';

type SelectFieldProps = {
  control?: Control<any>;
} & SelectProps &
  Omit<UseControllerProps, 'control'>;

const SelectField = ({ name, control, ...restProps }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...fieldRestProps } }) => (
        <Select
          {...restProps}
          onChangeOption={(option) => onChange(option.value)}
          {...fieldRestProps}
        />
      )}
    />
  );
};

export default SelectField;
