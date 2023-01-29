import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ContentListItem = styled.li``;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const IndexBadge = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};

    width: 2rem;
    height: 2rem;
    color: ${theme.colors.gray60};
    text-align: center;
    background-color: ${theme.colors.gray100};
    border-radius: 50%;
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    margin-left: 0.8rem;
    color: ${theme.colors.gray70};
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `}
`;

export const StartedAt = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular13};

    margin-left: auto;
    color: ${theme.colors.gray40};
  `}
`;

export const Content = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};

    display: inline-block;
    margin-top: 0.4rem;
    margin-left: 2.8rem;
    color: ${theme.colors.gray60};
  `}
`;
