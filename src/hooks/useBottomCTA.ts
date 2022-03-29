import { useMemo, useRef } from 'react';
import { Boundaries } from '@/components/common/BottomCTA/BottomCTA.component';
import useWindowScroll from './useWindowScroll';

const useBottomCTA = (boundaries: Boundaries) => {
  const { y: scrollY } = useWindowScroll();
  const prevScrollY = useRef(0);

  const isVisible = useMemo(() => {
    const isBottomDirection = prevScrollY.current < scrollY;
    const scrollMaxY =
      window.document.documentElement.offsetHeight -
      window.innerHeight -
      (boundaries.visibility?.bottomHeight || 0);
    const isInsideBoundary =
      (boundaries.visibility?.topHeight || 0) < scrollY && scrollY < scrollMaxY;
    prevScrollY.current = scrollY;

    return isInsideBoundary && isBottomDirection;
  }, [scrollY, boundaries]);

  const noAnimation = useMemo(() => {
    if (!boundaries.noAnimation) {
      return false;
    }
    const isBottomDirection = prevScrollY.current < scrollY;
    const isBottom =
      window.document.documentElement.offsetHeight -
        window.innerHeight -
        (boundaries.noAnimation?.bottomHeight || 0) <
      scrollY;

    return isBottom && !isBottomDirection;
  }, [scrollY, boundaries]);

  return { isVisible, noAnimation };
};

export default useBottomCTA;
