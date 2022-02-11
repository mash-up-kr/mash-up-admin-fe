import React, { ReactElement, SVGProps } from 'react';
import { ValueOf } from '@/types';
import * as Styled from './Button.styled';

export const ButtonSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export const ButtonShape = {
  default: 'default',
  defaultLine: 'defaultLine',
  primary: 'primary',
  primaryLine: 'primaryLine',
  icon: 'icon',
} as const;

export type ButtonSizeType = ValueOf<typeof ButtonSize>;
export type ButtonShapeType = ValueOf<typeof ButtonShape>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $size?: ButtonSizeType;
  shape?: ButtonShapeType;
  Icon?: (props: SVGProps<SVGElement>) => ReactElement;
  label?: string;
}

const Button = ({
  className,
  $size = 'sm',
  shape = 'default',
  Icon,
  label,
  ...resetProps
}: ButtonProps) => {
  return (
    <Styled.ButtonWrapper
      type="button"
      className={className}
      $size={$size}
      shape={shape}
      {...resetProps}
    >
      {Icon && <Icon />}
      {shape !== ButtonShape.icon && label}
    </Styled.ButtonWrapper>
  );
};

export default Button;
