import { useEffect } from 'react';

const useUnmount = (callback: () => void) => {
  useEffect(() => {
    return () => callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUnmount;
