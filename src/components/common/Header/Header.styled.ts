import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    height: ${HEADER_HEIGHT};
    border-bottom: 0.1rem solid ${theme.colors.gray30};
  `}
`;

export const HeaderContainerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 120rem;
  margin: 0 auto;
`;

export const VisuallyHiddenLogo = styled.h1`
  ${({ theme }) => css`
    ${theme.a11y.visuallyHidden};
  `}
`;
