import { useState, useMemo } from 'react';

const useDirty = (chance?: number) => {
  const [count, setCount] = useState(0);

  const makeDirty = () => setCount((prev) => prev + 1);
  const isDirty = useMemo(() => count > (chance || 0), [count, chance]);

  return {
    makeDirty,
    isDirty,
  };
};

export default useDirty;
