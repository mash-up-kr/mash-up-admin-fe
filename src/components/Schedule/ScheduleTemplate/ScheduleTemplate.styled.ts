import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ScheduleContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 36.9rem;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 2rem;
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.bold24};

    color: ${theme.colors.gray80};
  `}
`;

export const SessionContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-top: 2.4rem;
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 2rem;
  `}
`;

export const AddButton = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin: 0 auto;
  margin-top: 2.4rem;
  background-color: transparent;
`;
