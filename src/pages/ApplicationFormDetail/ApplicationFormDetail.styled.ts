import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Input, Textarea } from '@/components';

export const ApplicationFormDetailPage = styled.div`
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

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;

    & > span:first-of-type {
      ${theme.fonts.medium15};

      color: ${theme.colors.gray70};
    }

    & > span:nth-of-type(2) {
      ${theme.fonts.bold18};

      margin-top: 0.6rem;
      color: ${theme.colors.gray80};
    }
  `}
`;

export const QuestionContent = styled.ul`
  ${({ theme }) => css`
    margin-top: 1.6rem;
    padding-bottom: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;

    & > li {
      padding: 2.4rem 3.2rem;
    }
  `}
`;

export const CustomInput = styled(Input)`
  ${({ theme }) => css`
    & > label > span {
      ${theme.fonts.bold16};

      color: ${theme.colors.gray70};
    }

    input {
      max-height: 4.7rem;
    }
  `}
`;

export const CustomTextarea = styled(Textarea)`
  ${({ theme }) => css`
    & > label > span {
      ${theme.fonts.bold16};

      color: ${theme.colors.gray70};
    }

    textarea {
      min-height: 8.8rem;
    }
  `}
`;
