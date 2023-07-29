import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const LNBContainer = styled.nav`
  min-width: 20rem;
  height: calc(100vh - ${HEADER_HEIGHT});
  overflow: scroll;
  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;
