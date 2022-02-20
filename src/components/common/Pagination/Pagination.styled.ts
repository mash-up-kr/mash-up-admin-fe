import styled from '@emotion/styled';

interface BoxProps {
  width: string;
}

export const Box = styled.div<BoxProps>`
  display: flex;
  justify-content: flex-end;
  width: ${({ width }) => width};
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
`;

export const PageButtonListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55.6rem;

  & > button:last-child {
    margin: 0;
  }
`;
