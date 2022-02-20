import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TextareaWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const TextareaLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.medium15};
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.6rem;
  background-color: #eb6963;
  border-radius: 50%;
`;

export const Description = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular13};

    margin-bottom: 0.6rem;
    color: ${theme.colors.gray60};
  `}
`;

export const Textarea = styled.textarea`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    min-height: 20rem;
    padding: 1.2rem 1.4rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 1.2rem;
    outline: none;
    resize: none;

    &::placeholder {
      color: ${theme.colors.gray50};
    }

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }

    &:focus {
      border: 0.1rem solid ${theme.colors.purple70};
    }

    &:disabled {
      background-color: ${theme.colors.gray5};
      border: 0.1rem solid ${theme.colors.gray30};
    }
  `}
`;

export const TextareaErrorMessage = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    margin-top: 0.6rem;
    color: ${theme.colors.gray60};
  `}
`;
