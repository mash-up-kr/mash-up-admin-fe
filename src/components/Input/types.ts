import React from 'react';

export const InputSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export type InputSizeType = typeof InputSize[keyof typeof InputSize];

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size: InputSizeType;
  label?: string;
  errorMessage?: string;
}
