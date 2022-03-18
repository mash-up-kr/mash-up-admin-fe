import { useState } from 'react';

const useDirty = (chance = 0) => {
  const [count, setCount] = useState(0);

  const makeDirty = () => setCount((prev) => prev + 1);
  const isDirty = count > chance;

  return {
    makeDirty,
    isDirty,
  };
};

export default useDirty;
