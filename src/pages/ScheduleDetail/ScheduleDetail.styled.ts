import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ScheduleDetailPage = styled.div`
  padding: 2rem 0 4rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4.8rem;

  h2 {
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-left: auto;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 2rem;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 2rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);

    h3 {
      ${theme.fonts.bold24};
    }
  `}
`;

export const SessionList = styled.ul``;
