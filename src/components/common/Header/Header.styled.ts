import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 9;
    height: ${HEADER_HEIGHT};
    background: ${theme.colors.white};
    border-bottom: 0.1rem solid ${theme.colors.gray100};
  `}
`;

export const HeaderContainerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-left: 2rem;
`;

export const VisuallyHiddenLogo = styled.h1`
  ${({ theme }) => css`
    ${theme.a11y.visuallyHidden};
  `}
`;
