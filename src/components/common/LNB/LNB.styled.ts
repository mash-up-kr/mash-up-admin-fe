import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const LNBContainer = styled.nav`
  min-width: 20rem;
  height: calc(100vh - ${HEADER_HEIGHT});
  overflow: scroll;
  box-shadow: inset -1px 0px ${({ theme }) => theme.colors.gray100};
`;
