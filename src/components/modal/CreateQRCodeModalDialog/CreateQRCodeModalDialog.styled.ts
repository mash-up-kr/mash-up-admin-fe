import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputField } from '@/components';

export const QRTimeInputLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium15}

    display: flex;
    gap: 0.6rem;
    align-items: center;
    margin: 0 0 0.6rem;
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

export const QRTimeInput = styled(InputField)`
  width: 16rem;

  input {
    width: 13rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
