import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ApplicationConfirmationStatusType, ApplicationResultStatusType } from './Label.component';

interface StyledLabelProps {
  text: ApplicationConfirmationStatusType | ApplicationResultStatusType;
}

export const LabelWrapper = styled.div<StyledLabelProps>`
  ${({ theme, text }) => css`
    ${theme.fonts.medium13}
    ${theme.label[text]}
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.6rem;
    height: 2.8rem;
    border-radius: 0.8rem;
    cursor: default;
  `}
`;
