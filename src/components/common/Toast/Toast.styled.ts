import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ValueOf } from '@/types';
import { ToastType } from './Toast.component';

interface StyledToastProps {
  type: ValueOf<typeof ToastType>;
}

export const Toast = styled.div<StyledToastProps>`
  ${({ theme, type }) => css`
    ${theme.toast.type[type]};
    ${theme.zIndex.toast};

    position: fixed;
    top: 7rem;
    left: 50%;
    display: inline-flex;
    align-items: center;
    min-width: 50rem;
    margin: 0 auto;
    padding: 1.6rem;
    color: ${theme.colors.gray80};
    border-radius: 1.6rem;
    box-shadow: 0 0.4rem 2rem rgba(33, 37, 41, 0.15);
    transform: translateX(-50%);

    span {
      ${theme.fonts.bold16};

      margin-left: 0.8rem;
    }

    button {
      display: flex;
      align-self: center;
      justify-content: center;
      margin-left: auto;
      padding: 0;
      background-color: inherit;
      border-radius: 0.8rem;

      &:hover {
        background-color: ${theme.colors.white};
      }
    }
  `}
`;
