import { atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { AlertModalDialogProps } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { ValueOf } from '@/types';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { SmsSendModalDialogProps } from '@/components/common/SmsSendModalDialog/SmsSendModalDialog.component';

export const ModalKey = {
  alertModalDialog: 'alertModalDialog',
  smsSendModalDialog: 'smsSendModalDialog',
  changeResultModalDialog: 'changeResultModalDialog',
  smsSendDetailInfoModalDialog: 'smsSendDetailInfoModalDialog',
  smsSendDetailListModalDialog: 'smsSendDetailListModalDialog',
} as const;

export type ModalKeyType = ValueOf<typeof ModalKey>;
export type ModalProps =
  | AlertModalDialogProps
  | SmsSendModalDialogProps
  | ChangeResultModalDialogProps;

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

      if (hash) {
        window.location.hash = hash;
      } else {
        window.history.replaceState('', document.title, window.location.pathname);
      }

      return get($modal(key));
    },
  set:
    (key) =>
    ({ set }, params) => {
      set($modal(key), params);
    },
});
