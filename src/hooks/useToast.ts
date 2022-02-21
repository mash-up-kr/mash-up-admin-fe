import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ToastProps } from '@/components/common/Toast/Toast.component';
import { $toast } from '@/store';

interface UseToastProps extends ToastProps {
  conditions: boolean[];
  duration?: number;
  dependencies: unknown[];
  callbackAfterReset?(): void;
}

const DEFAULT_TOAST_DURATION = 3000;

const useToast = ({
  type,
  conditions,
  message,
  dependencies,
  duration = DEFAULT_TOAST_DURATION,
  callbackAfterReset,
}: UseToastProps) => {
  const setToast = useSetRecoilState($toast);

  useEffect(() => {
    if (conditions.every((condition) => condition)) {
      setToast({
        type,
        message,
      });

      setTimeout(() => {
        setToast(undefined);
        callbackAfterReset?.();
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useToast;
