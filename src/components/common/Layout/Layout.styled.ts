import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants';

export const Main = styled.main`
  max-width: 120rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  margin: 0 auto;
`;
