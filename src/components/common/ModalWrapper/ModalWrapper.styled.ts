import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 30rem;
    min-height: 10rem;
    background: ${theme.colors.white};
    border-radius: 3rem;
  `}
`;

export const ModalHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2.95rem 2.4rem;

    > h1 {
      ${theme.fonts.bold28}
    }

    > button {
      background-color: ${theme.colors.gray10};
      border: transparent;
    }
  `}
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 2.4rem 2.4rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 2.8rem 2.4rem;
`;
