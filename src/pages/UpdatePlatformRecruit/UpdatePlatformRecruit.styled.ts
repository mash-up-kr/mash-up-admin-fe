import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Select } from '@/components';

export const PageWrapper = styled.div`
  padding: 4rem 0;
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `};
`;

export const EditorWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding-top: 20px;
`;

export const TeamSelect = styled(Select)`
  width: 100%;
`;
