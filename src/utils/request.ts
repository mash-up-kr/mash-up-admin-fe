import axios from 'axios';
import { ToastProps, ToastType } from '@/components/common/Toast/Toast.component';

interface Request<T> {
  requestFunc: () => Promise<T>;
  errorHandler: (toast: ToastProps) => void;
  onSuccess?: (data: T) => void;
}

export const request = async <T>({ requestFunc, errorHandler, onSuccess }: Request<T>) => {
  try {
    onSuccess?.(await requestFunc());
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorHandler({
            message: error.response.data.message,
            type: ToastType.error,
          });
        }
      }
    }
  }
};
