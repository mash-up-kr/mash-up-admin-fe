import React, { forwardRef } from 'react';
import { Select } from '@/components';
import { SelectProps } from '@/components/common/Select/Select.component';

const SelectField = (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
  return <Select {...props} ref={ref} />;
};

export default forwardRef<HTMLSelectElement, SelectProps>(SelectField);
