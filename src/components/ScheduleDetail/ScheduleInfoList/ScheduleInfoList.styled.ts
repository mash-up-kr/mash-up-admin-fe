import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ScheduleInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2rem;

  li {
    display: flex;
    flex-direction: column;
  }
`;

export const ScheduleInfoLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};

    color: ${theme.colors.gray60};
  `}
`;

export const ScheduleInfoValue = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular16};

    display: inline-block;
    margin-top: 0.4rem;
  `}
`;
