import React, { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ToggleButtonProps } from '@/components/common/ToggleButton/ToggleButton.component';
import { ToggleButton } from '@/components';

const InputField = (props: ToggleButtonProps, ref: React.Ref<HTMLInputElement>) => {
  return <ToggleButton ref={ref} {...props} />;
};

export default forwardRef<
  HTMLInputElement,
  ToggleButtonProps & ReturnType<UseFormRegister<FieldValues>>
>(InputField);
