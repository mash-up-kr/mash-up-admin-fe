import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PositionType } from '@/components/common/ModalWrapper/ModalWrapper.component';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.zIndex.dialog};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 40rem;
    min-height: 10rem;
    background-color: ${theme.colors.white};
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

    & > h2 {
      ${theme.fonts.bold28}
    }

    & > button {
      background-color: ${theme.colors.gray10};
      border-width: 0;
    }
  `}
`;

export const ModalContent = styled.div`
  width: 100%;
`;

interface StyledModalFooter {
  position: PositionType;
}

export const ModalFooter = styled.div<StyledModalFooter>`
  ${({ position }) => css`
    display: flex;
    gap: 0.6rem;
    align-items: center;
    justify-content: ${position};
    width: 100%;
    padding: 2.8rem 2.4rem;
  `}
`;
