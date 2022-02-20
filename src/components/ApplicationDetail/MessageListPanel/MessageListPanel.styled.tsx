import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MessageListPanelContainer = styled.div`
  ${({ theme }) => css`
    width: 38.4rem;
    height: fit-content;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);

    & h3 {
      ${theme.fonts.bold24}
      margin-bottom: 2rem;
    }
  `}
`;

export const MessageListPanelTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > button {
    height: 3rem;
  }
`;

export const MessageInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 1.6rem;
    background-color: ${theme.colors.gray5};
    border: 0.1rem solid ${theme.colors.gray20};
    border-radius: 0.8rem;

    & div > span:first-child {
      ${theme.fonts.regular16}
    }
  `}
`;

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & > div:first-child {
      ${theme.fonts.bold17}
    }

    & > div:last-child {
      ${theme.fonts.regular13}
      color: ${theme.colors.gray70}
    }
  `}
`;

export const MessageListPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
