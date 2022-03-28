import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ErrorPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bold22}
  `}
`;

export const ErrorPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  align-items: center;
`;
