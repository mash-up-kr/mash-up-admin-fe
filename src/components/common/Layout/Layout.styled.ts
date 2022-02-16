import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

interface StyledMainProps {
  isBackgroundGray: boolean;
}

export const Main = styled.main<StyledMainProps>`
  ${({ isBackgroundGray, theme }) => css`
    background-color: ${isBackgroundGray ? theme.colors.gray30 : theme.colors.white};

    & > section {
      max-width: 120rem;
      min-height: calc(100vh - ${HEADER_HEIGHT});
      margin: 0 auto;
    }
  `}
`;
