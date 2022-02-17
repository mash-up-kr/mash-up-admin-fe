import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ApplicationConfirmationStatusType,
  ApplicationResultStatusType,
} from './ApplicationStatusBadge.component';

interface StyledApplicationStatusBadgeProps {
  text: ApplicationConfirmationStatusType | ApplicationResultStatusType;
}

export const ApplicationStatusBadgeWrapper = styled.div<StyledApplicationStatusBadgeProps>`
  ${({ theme, text }) => css`
    ${theme.fonts.medium13}
    ${theme.badge[text]}
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.6rem;
    height: 2.8rem;
    border-radius: 0.8rem;
    cursor: default;
  `}
`;
