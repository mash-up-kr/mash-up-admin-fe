import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CreateApplicationFormAside = styled.aside`
  ${({ theme }) => css`
    width: 38.4rem;
    height: fit-content;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);
  `}
`;

export const Headline = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray80};
    font-size: 2.4rem;
    line-height: 3rem;
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    height: 0.1rem;
    margin: 2rem 0;
    background-color: ${theme.colors.gray30};
  `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
`;

export const Label = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray60};
    font-size: 1.4rem;
    line-height: 2.1rem;
  `}
`;

export const Content = styled.span`
  ${({ theme }) => css`
    margin-top: 0.4rem;
    color: ${theme.colors.gray80};
    font-size: 1.6rem;
    line-height: 2.4rem;
  `}
`;

export const ButtonContainer = styled.div`
  display: flex;

  & > button:nth-child(2) {
    margin-left: auto;
  }

  & > button:nth-child(3) {
    margin-left: 0.6rem;
  }
`;
