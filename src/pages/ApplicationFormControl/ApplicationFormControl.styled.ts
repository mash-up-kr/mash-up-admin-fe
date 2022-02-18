import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ApplicationFormControlPage = styled.div`
  padding: 2rem 0 4rem;

  & > form {
    display: flex;

    & > article {
      flex: 1;
    }

    & > aside {
      margin-left: 1.6rem;
    }
  }
`;

export const Headline = styled.h1`
  ${({ theme }) => css`
    margin: 1.2rem 0 0.8rem;
    color: ${theme.colors.gray80};
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;
  `}
`;

export const QuestionContent = styled.div`
  ${({ theme }) => css`
    margin-top: 1.6rem;
    padding-bottom: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    height: 0.1rem;
    margin: 0 3.2rem;
    background-color: ${theme.colors.gray30};
  `}
`;

export const AddButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin: 2.4rem auto 0;
    padding: 1.6rem 2rem;
    background-color: inherit;

    & > span {
      ${theme.fonts.medium16};

      margin-left: 0.4rem;
      color: ${theme.colors.gray70};
    }
  `}
`;
