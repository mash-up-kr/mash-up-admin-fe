import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    height: 7rem;
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
