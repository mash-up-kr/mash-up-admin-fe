import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const SmsSendModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 50rem;
  padding: 1.2rem 2.4rem;

  & .textarea {
    ${({ theme }) => css`
      width: 100%;

      & textarea {
        ${theme.fonts.regular13}

        color: ${theme.colors.gray70};

        &::placeholder {
          ${theme.fonts.regular13}
        }

        &:disabled {
          color: ${theme.colors.gray60};
        }
      }
    `}
  }
`;

export const TitleArea = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    & > button {
      ${theme.fonts.regular14}
      display: flex;
      align-items: center;
      justify-content: center;
      height: fit-content;
      color: ${theme.colors.gray60};
      background-color: transparent;
    }
  `}
`;

interface StyledStatusAreaProps {
  isSendFailed: boolean;
}

export const StatusArea = styled.div<StyledStatusAreaProps>`
  ${({ isSendFailed }) => css`
    ${isSendFailed
      ? css`
          display: flex;
          justify-content: flex-start;

          & > div {
            width: 50%;
          }
        `
      : css`
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        `}
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    height: 0.1rem;
    background-color: ${theme.colors.gray30};
  `}
`;
