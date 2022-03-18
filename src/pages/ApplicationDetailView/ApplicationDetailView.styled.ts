import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ApplicationDetailViewPage = styled.div`
  padding: 2rem 0 4rem;

  & > div {
    display: flex;

    & > article {
      flex: 1;
    }

    & > aside {
      margin-left: 1.6rem;
    }
  }
`;

export const Headline = styled.h2`
  ${({ theme }) => css`
    margin: 1.2rem 0 0.8rem;
    color: ${theme.colors.gray80};
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;

export const ApplicantInfo = styled.div`
  ${({ theme }) => css`
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;

    & > section {
      display: flex;
      margin-top: 2rem;

      & > div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 50%;
      }
    }

    & > h3 {
      ${theme.fonts.bold24}
      margin-bottom: 2rem;
    }
  `}
`;

export const QuestionList = styled.div`
  ${({ theme }) => css`
    margin-top: 1.6rem;
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;

    & > section {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    & > h3 {
      ${theme.fonts.bold24}
      margin-bottom: 2rem;
    }
  `}
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 0.1rem;
    margin-top: 2rem;
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
