import { atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { AlertModalDialogProps } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { ValueOf } from '@/types';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { SmsSendModalDialogProps } from '@/components/common/SmsSendModalDialog/SmsSendModalDialog.component';
import { SmsSendDetailInfoModalDialogProps } from '@/components/modal/SmsSendDetailInfoModalDialog/SmsSendDetailInfoModalDialog.component';
import { SmsSendDetailListModalDialogProps } from '@/components/modal/SmsSendDetailListModalDialog/SmsSendDetailListModalDialog.component';
import { ApplyActivityScoreModalDialogProps } from '@/components/modal/applyActivityScoreModalDialog/applyActivityScoreModalDialog.component';

export const ModalKey = {
  alertModalDialog: 'alertModalDialog',
  smsSendModalDialog: 'smsSendModalDialog',
  changeResultModalDialog: 'changeResultModalDialog',
  smsSendDetailInfoModalDialog: 'smsSendDetailInfoModalDialog',
  smsSendDetailListModalDialog: 'smsSendDetailListModalDialog',
  applyActivityScoreModalDialog: 'applyActivityScoreModalDialog',
} as const;

export type ModalKeyType = ValueOf<typeof ModalKey>;
export type ModalProps =
  | AlertModalDialogProps
  | SmsSendModalDialogProps
  | SmsSendDetailListModalDialogProps
  | SmsSendDetailInfoModalDialogProps
  | ChangeResultModalDialogProps
  | ApplyActivityScoreModalDialogProps;

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
      return get($modal(key));
    },
  set:
    (key) =>
    ({ set }, params) => {
      set($modal(key), params);
    },
});
