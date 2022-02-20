import { atom } from 'recoil';
import { LoginResponse } from '@/types/dto';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { selectorWithRefresher } from './recoil';

export const $me = atom<LoginResponse>({
  key: 'me',
  default: {
    accessToken: '',
    adminMember: {
      adminMemberId: 0,
      username: '',
    },
  },
});

export const $isAuthorized = selectorWithRefresher<boolean>({
  key: 'isAuthorized',
  get: ({ get }) => {
    const { accessToken } = get($me);
    return !!accessToken;
  },
});

export const $profile = selectorWithRefresher<[string, string]>({
  key: 'profile',
  get: ({ get }) => {
    const { position } = get($me).adminMember;
    return position ? (position.split('_') as [TeamType, RoleType]) : ['', ''];
  },
});
