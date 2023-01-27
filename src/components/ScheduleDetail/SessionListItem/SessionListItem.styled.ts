import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SessionListItem = styled.li`
  ${({ theme }) => css`
    padding: 2.4rem 0;

    &:not(&:last-of-type) {
      border-bottom: 0.1rem solid ${theme.colors.gray100};
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SessionTitle = styled.h4`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.4rem;
`;

export const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;
`;
