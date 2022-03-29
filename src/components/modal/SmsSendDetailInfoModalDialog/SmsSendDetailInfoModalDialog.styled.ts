import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SmsStatus } from '@/types';

export const Wrapper = styled.div`
  display: flex;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 38rem;
  max-width: 48.6rem;
  max-height: 65vh;
  padding: 2.4rem 1rem 2.4rem 2.4rem;
`;

export const TableWrapper = styled.div`
  width: 51.4rem;
  max-height: 65vh;
  padding: 2.4rem 2.4rem 2.4rem 1rem;
`;

export const CustomUserProfile = styled.div`
  ${({ theme }) => css`
    & div:first-of-type {
      ${theme.fonts.regular16};
    }

    & span:last-of-type {
      margin-top: 0.1rem;
    }
  `}
`;

export const SendingStatus = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular16};

    & > span:first-of-type {
      color: ${theme.colors.blue70};
    }
    & > span:nth-of-type(2) {
      color: ${theme.colors.red70};
    }
    & > span:last-of-type {
      color: ${theme.colors.gray80};
    }
  `}
`;

export const StatusWrapper = styled.div<{ status: string }>`
  ${({ theme, status }) => css`
    ${status === SmsStatus.SUCCESS &&
    css`
      color: ${theme.colors.blue70};
    `}

    ${status === SmsStatus.FAILURE &&
    css`
      color: ${theme.colors.red70};
    `}
  `}
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  word-break: break-all;
`;
