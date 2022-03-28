import React, { ReactNode } from 'react';
import { useBottomCTA } from '@/hooks';
import * as Styled from './BottomCTA.styled';

interface Boundary {
  topHeight?: number;
  bottomHeight?: number;
}

export interface Boundaries {
  visibility: Boundary;
  noAnimation?: Boundary;
}

interface BottomCTAProps {
  children: ReactNode;
  boundaries: Boundaries;
}

const BottomCTA = ({ children, boundaries }: BottomCTAProps) => {
  const { isVisible, noAnimation } = useBottomCTA(boundaries);
  return (
    <Styled.Container isVisible={isVisible} noAnimation={noAnimation}>
      {children}
    </Styled.Container>
  );
};

export default BottomCTA;
