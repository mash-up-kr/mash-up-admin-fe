import React, { forwardRef, ReactElement, SVGProps, useImperativeHandle, useRef } from 'react';
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
  smallIcon: 'smallIcon',
} as const;

export type ButtonSizeType = ValueOf<typeof ButtonSize>;
export type ButtonShapeType = ValueOf<typeof ButtonShape>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $size?: ButtonSizeType;
  shape?: ButtonShapeType;
  Icon?: (props: SVGProps<SVGElement>) => ReactElement;
  label?: string;
}

export interface ParentRef {
  focus: () => void;
}

const Button = (
  { children, className, $size = 'sm', shape = 'default', Icon, label, ...resetProps }: ButtonProps,
  parentRef: React.Ref<ParentRef>,
) => {
  const childRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(parentRef, () => {
    return {
      focus: () => {
        if (childRef.current) {
          childRef.current.focus();
        }
      },
    };
  });

  return (
    <Styled.ButtonWrapper
      ref={childRef}
      type="button"
      className={className}
      $size={$size}
      shape={shape}
      {...resetProps}
    >
      {Icon && <Icon />}
      {shape !== ButtonShape.icon && label}
      {children}
    </Styled.ButtonWrapper>
  );
};

export default forwardRef<ParentRef, ButtonProps>(Button);
