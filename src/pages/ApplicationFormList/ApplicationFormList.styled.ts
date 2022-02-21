import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  padding: 4rem 0 8rem 0;
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 2.4rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `};
`;

export const FormTitle = styled.div`
  width: 100%;
  padding: 0 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
`;

export const CustomUserProfile = styled.div`
  ${({ theme }) => css`
    & div:first-of-type {
      ${theme.fonts.regular14};
    }
  `}
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
