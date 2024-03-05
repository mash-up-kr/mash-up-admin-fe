import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ScheduleContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

export const InputLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.medium15}
    display: flex;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  min-width: 0.6rem;
  height: 0.6rem;
  margin: 0.8rem 0 0 0.6rem;
  background-color: #eb6963;
  border-radius: 50%;
`;

export const RadioButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

export const InputWithButton = styled.div`
  display: flex;
  gap: 1rem;
`;
