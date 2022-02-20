import { atom, selector } from 'recoil';
import { LoginResponse } from '@/types/dto';
import { ACCESS_TOKEN } from '@/constants';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';

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

export const $isAuthorized = selector<boolean>({
  key: 'isAuthorized',
  get: ({ get }) => {
    const { accessToken } = get($me);
    return !!localStorage.getItem(ACCESS_TOKEN) && !accessToken;
  },
});

export const $profile = selector<[string, string]>({
  key: 'profile',
  get: ({ get }) => {
    const { position } = get($me).adminMember;
    return position ? (position.split('_') as [TeamType, RoleType]) : ['', ''];
  },
});
