import React, { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InputProps } from '@/components/common/Input/Input.component';
import { Input } from '@/components';

const InputField = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  return <Input ref={ref} {...props} />;
};

export default forwardRef<HTMLInputElement, InputProps & ReturnType<UseFormRegister<FieldValues>>>(
  InputField,
);
