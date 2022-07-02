import type { Transition, History, Blocker } from 'history';
import { ContextType, useContext, useEffect, useState } from 'react';

import {
  Navigator as BaseNavigator,
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface Navigator extends BaseNavigator {
  block: History['block'];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & { navigator: Navigator };

const useBlocker = (blocker: Blocker, when = true) => {
  const { navigator } = useContext(NavigationContext) as NavigationContextWithBlock;

  useEffect(() => {
    if (!when) {
      return;
    }

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};

const usePrompt = (when = true) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<Transition | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = () => {
    setShowPrompt(false);
  };

  const blocker = (tx: Transition) => {
    if (!confirmedNavigation && tx.location.pathname !== location.pathname) {
      setShowPrompt(true);
      setLastLocation(tx);

      return false;
    }

    return true;
  };

  const confirmNavigation = () => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  };

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);
    }
  }, [confirmedNavigation, lastLocation, navigate]);

  useBlocker(blocker, when);

  return { showPrompt, confirmNavigation, cancelNavigation };
};

export default usePrompt;
