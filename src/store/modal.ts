import { atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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
const { persistAtom } = recoilPersist();

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
