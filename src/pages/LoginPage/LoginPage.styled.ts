import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

interface StyledLoginContainerProps {
  isError?: boolean;
}

export const LoginContainer = styled.form<StyledLoginContainerProps>`
  ${({ theme, isError }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40rem;
    height: 59.3rem;
    padding: 6rem 0 21.1rem;
    background-color: ${theme.colors.white};
    border-radius: 4rem;

    & > div {
      position: absolute;
      top: 16.4rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      justify-content: center;
      width: 30rem;
      color: ${isError ? theme.colors.red70 : theme.colors.gray30};

      & > div {
        & > input {
          border-color: ${isError ? theme.colors.red70 : theme.colors.gray30};
        }

        & > span {
          color: ${isError ? theme.colors.red70 : theme.colors.gray30};
        }
      }
    }

    & > button {
      width: 30rem;
    }

    & > svg:last-child {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  `}
`;
