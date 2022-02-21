import { useRecoilState } from 'recoil';

import { ToastProps } from '@/components/common/Toast/Toast.component';
import { $toast } from '@/store';

const TOAST_DURATION = 3000;

let toastTimeout: NodeJS.Timeout;

const useToast = () => {
  const [toast, setToast] = useRecoilState($toast);

  const handleRemoveToast = () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    setToast(undefined);
  };

  const handleAddToast = (newToast: ToastProps) => {
    if (toast) {
      handleRemoveToast();
    }

    setToast({
      ...newToast,
    });

    toastTimeout = setTimeout(() => {
      setToast(undefined);
    }, TOAST_DURATION);
  };

  return {
    handleAddToast,
    handleRemoveToast,
  };
};

export default useToast;
