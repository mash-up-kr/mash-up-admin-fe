import { atomFamily } from 'recoil';
import { AlertModalDialogProps } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { ValueOf } from '@/types';

export const ModalKey = {
  alertModalDialog: 'alertModalDialog',
} as const;

export type ModalKeyType = ValueOf<typeof ModalKey>;
export type ModalProps = AlertModalDialogProps;

export interface Modal {
  key: ModalKeyType;
  props?: ModalProps;
  isOpen: boolean;
}

export const $modal = atomFamily<Modal, ModalKeyType>({
  key: 'modal',
  default: (key) => {
    return {
      key,
      isOpen: false,
    };
  },
});
