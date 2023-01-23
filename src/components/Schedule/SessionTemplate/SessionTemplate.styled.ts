import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputField } from '@/components';

export const SessionTemplateWrapper = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    background-color: ${theme.colors.gray5};
    border-radius: 2rem;
  `}
`;

export const SessionTimeInputLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium15}

    display: flex;
    gap: 0.6rem;
    align-items: center;
    margin: 4.4rem 0 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  ${({ theme }) => css`
    width: 0.6rem;
    height: 0.6rem;
    background-color: ${theme.colors.red50};
    border-radius: 50%;
  `}
`;

export const SessionTimeInputWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const SessionTimeInput = styled(InputField)`
  display: inline-block;
  flex: 0;

  input {
    width: 16rem;
  }
`;

export const ContentTemplateWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 2.4rem;
    padding: 1rem;
    background-color: ${theme.colors.gray20};
    border-radius: 1.2rem;
  `}
`;

export const AddButton = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  height: 5.6rem;
  margin: 0 auto;
  margin-top: 2.4rem;
  background-color: transparent;
`;

export const DeleteButton = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  height: 5.6rem;
  margin: 0 auto;
  margin-top: 2.4rem;
  background-color: transparent;
`;
