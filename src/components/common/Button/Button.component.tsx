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
  isLoading?: boolean;
}

export interface ParentRef {
  focus: () => void;
}

const Button = (
  {
    children,
    className,
    $size = 'sm',
    shape = 'default',
    Icon,
    label,
    isLoading = false,
    ...resetProps
  }: ButtonProps,
  parentRef: React.Ref<ParentRef>,
) => {
  const childRef = useRef<HTMLButtonElement>(null);
  const showLabel = shape !== ButtonShape.icon && !isLoading;

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
      disabled={isLoading}
      {...resetProps}
    >
      {Icon && <Icon />}
      {showLabel && label}
      {children}
      {isLoading && <Styled.Spinner />}
    </Styled.ButtonWrapper>
  );
};

export default forwardRef<ParentRef, ButtonProps>(Button);
