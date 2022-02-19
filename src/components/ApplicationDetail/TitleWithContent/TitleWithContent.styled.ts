import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TitleWithContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
`;

interface StyledLabelProps {
  isLineThrough: boolean;
  isActive: boolean;
}

export const Label = styled.h4<StyledLabelProps>`
  ${({ theme, isLineThrough, isActive }) => css`
    ${theme.fonts.medium14}
    color: ${isActive ? theme.colors.gray70 : theme.colors.gray60};
    font-size: 1.4rem;
    line-height: 2.1rem;
    ${isLineThrough
      ? css`
          text-decoration: line-through;
        `
      : css``}
  `}
`;

export const Content = styled.span`
  ${({ theme }) => css`
    width: 100%;
    margin-top: 0.4rem;
    color: ${theme.colors.gray80};
    font-size: 1.6rem;
    line-height: 2.4rem;
  `}
`;
