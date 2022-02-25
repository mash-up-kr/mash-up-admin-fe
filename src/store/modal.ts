import { atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { AlertModalDialogProps } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { ValueOf } from '@/types';
import { SmsSendModalDialogProps } from '@/components/ApplicationDetail/SmsSendModalDialog/SmsSendModalDialog.component';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { MultipleSmsSendModalDialogProps } from '@/components/modal/MultipleSmsSendModalDialog/MultipleSmsSendModalDialog.component';

export const ModalKey = {
  alertModalDialog: 'alertModalDialog',
  smsSendModalDialog: 'smsSendModalDialog',
  multipleSmsSendModalDialog: 'multipleSmsSendModalDialog',
  changeResultModalDialog: 'changeResultModalDialog',
} as const;

export type ModalKeyType = ValueOf<typeof ModalKey>;
export type ModalProps =
  | AlertModalDialogProps
  | SmsSendModalDialogProps
  | ChangeResultModalDialogProps
  | MultipleSmsSendModalDialogProps;

export interface Modal {
  key: ModalKeyType;
  props?: ModalProps;
  isOpen: boolean;
}

const { persistAtom } = recoilPersist({ key: 'modal', storage: localStorage });

export const $modal = atomFamily<Modal, ModalKeyType>({
  key: 'modal',
  default: (key) => {
    return {
      key,
      isOpen: false,
    };
  },
  effects_UNSTABLE: [persistAtom],
});

export const $modalByStorage = selectorFamily<Modal, ModalKeyType>({
  key: 'modalByStorage',
  get:
    (key) =>
    ({ get }) => {
      const hash = Object.values(ModalKey).reduce<string>((acc, cur) => {
        if (cur === ModalKey.alertModalDialog) {
          return acc;
        }
        const curVal = get($modal(cur));
        return curVal.isOpen ? `${acc}#${curVal.key}` : acc;
      }, '');

      window.location.hash = hash;

      return get($modal(key));
    },
  set:
    (key) =>
    ({ set }, params) => {
      set($modal(key), params);
    },
});
