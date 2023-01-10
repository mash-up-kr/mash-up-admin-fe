import { atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { AlertModalDialogProps } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { ValueOf } from '@/types';
import { ChangeResultModalDialogProps } from '@/components/modal/ChangeResultModalDialog/ChangeResultModalDialog.component';
import { EmailSendModalDialogProps } from '@/components/common/EmailSendModalDialog/EmailSendModalDialog.component';
import { EmailSendDetailInfoModalDialogProps } from '@/components/modal/EmailSendDetailInfoModalDialog/EmailSendDetailInfoModalDialog.component';
import { EmailSendDetailListModalDialogProps } from '@/components/modal/EmailSendDetailListModalDialog/EmailSendDetailListModalDialog.component';
import { ApplyActivityScoreModalDialogProps } from '@/components/modal/ApplyActivityScoreModalDialog/ApplyActivityScoreModalDialog.component';
import { ActivityScoreModalDialogProps } from '@/components/modal/ActivityScoreModalDialog/ActivityScoreModalDialog.component';

export const ModalKey = {
  alertModalDialog: 'alertModalDialog',
  emailSendModalDialog: 'emailSendModalDialog',
  changeResultModalDialog: 'changeResultModalDialog',
  emailSendDetailInfoModalDialog: 'emailSendDetailInfoModalDialog',
  emailSendDetailListModalDialog: 'emailSendDetailListModalDialog',
  applyActivityScoreModalDialog: 'applyActivityScoreModalDialog',
  activityScoreModalDialog: 'activityScoreModalDialog',
} as const;

export type ModalKeyType = ValueOf<typeof ModalKey>;
export type ModalProps =
  | AlertModalDialogProps
  | EmailSendModalDialogProps
  | EmailSendDetailListModalDialogProps
  | EmailSendDetailInfoModalDialogProps
  | ChangeResultModalDialogProps
  | ApplyActivityScoreModalDialogProps
  | ActivityScoreModalDialogProps;

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
