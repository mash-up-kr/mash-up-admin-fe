import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

interface StyledMainProps {
  isBackgroundGray: boolean;
}

export const Main = styled.main<StyledMainProps>`
  ${({ isBackgroundGray, theme }) => css`
    flex: 10;
    background-color: ${isBackgroundGray ? theme.colors.gray10 : theme.colors.white};
    & > section {
      max-width: 120rem;
      min-height: calc(100vh - ${HEADER_HEIGHT});
      margin: 0 auto;
    }
  `}
`;

export const SelectWrapper = styled.div`
  margin-top: 4rem;
`;

export const LayoutWrapper = styled.div`
  display: flex;
`;

export const EmptyRightSection = styled.div`
  flex: 1;
  min-width: 20rem;
`;
