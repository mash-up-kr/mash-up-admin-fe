import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HEADER_HEIGHT } from '@/constants';

export const Main = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray10};
  `}
`;

export const Content = styled.div`
  max-width: 120rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  margin: 0 auto;
`;
