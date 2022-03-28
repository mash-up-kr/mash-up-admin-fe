import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div<{ isVisible: boolean; noAnimation?: boolean }>`
  ${({ theme, isVisible, noAnimation }) =>
    css`
      position: fixed;
      bottom: 0;
      width: 120rem;
      padding: 1rem 0 3rem 0;
      background-color: ${theme.colors.white};
      transform: translateY(${isVisible ? '0% ' : '100%'});
      transition: transform ${noAnimation ? '0s' : '0.4s'};
    `}
`;
