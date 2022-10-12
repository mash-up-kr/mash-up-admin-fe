import React, { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import RadioButton, {
  RadioButtonProps,
} from '@/components/common/RadioButton/RadioButton.component';

const RadioButtonField = (props: RadioButtonProps, ref: React.Ref<HTMLInputElement>) => {
  return <RadioButton ref={ref} {...props} />;
};

export default forwardRef<
  HTMLInputElement,
  RadioButtonProps & ReturnType<UseFormRegister<FieldValues>>
>(RadioButtonField);
