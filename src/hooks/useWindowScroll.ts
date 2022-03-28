import { useCallback, useState, useEffect } from 'react';

export interface ScrollInfo {
  x: number;
  y: number;
}

const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollInfo>({ x: 0, y: 0 });

  const onScroll = useCallback(() => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  }, [setScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return scrollPosition;
};

export default useWindowScroll;
