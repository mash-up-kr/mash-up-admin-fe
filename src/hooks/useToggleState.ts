import { useState } from 'react';

const useToggleState = (initialState: boolean | (() => boolean)): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const handleToggleState = () => setState(!state);

  return [state, handleToggleState];
};
export default useToggleState;
