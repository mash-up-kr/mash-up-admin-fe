import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledLabelProps {
  backgroundColor: string;
  color: string;
}

export const LabelWrapper = styled.div<StyledLabelProps>`
  ${({ theme, color, backgroundColor }) => css`
    ${theme.fonts.medium13}
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.6rem;
    height: 2.8rem;
    color: ${color};
    background-color: ${backgroundColor};
    border-radius: 0.8rem;
    cursor: default;
  `}
`;
