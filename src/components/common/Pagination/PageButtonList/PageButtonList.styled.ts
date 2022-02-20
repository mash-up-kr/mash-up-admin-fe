import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledPageCommonButtonProps {
  disabled: boolean;
}

export const OrderedList = styled.ol`
  display: flex;
`;

const PageCommonButton = styled.button<StyledPageCommonButtonProps>`
  width: 3.6rem;
  height: 3.6rem;
  margin-right: 0.4rem;
  padding: 0;
  background-color: transparent;
  border-radius: 0.5rem;
`;

export const ArrowButton = styled(PageCommonButton)`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    & svg path {
      stroke: ${disabled ? theme.colors.gray40 : theme.colors.gray60};
    }

    &:hover {
      background-color: ${disabled ? '' : theme.colors.gray10};
    }
  `}
`;

export const PageButton = styled(PageCommonButton)`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.colors.purple60 : theme.colors.gray60};
    background-color: ${disabled && theme.colors.purple20};
    cursor: ${disabled ? 'auto' : 'pointer'} !important;

    &:hover {
      background-color: ${theme.colors.purple20};
    }
  `}
`;
