import { atom } from 'recoil';
import { LoginResponse, MemberPositionType } from '@/types/dto';
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

export const $profile = selectorWithRefresher<[string, string, MemberPositionType | undefined]>({
  key: 'profile',
  get: ({ get }) => {
    const { position } = get($me).adminMember;

    const formattedPosition: [string, string] = position
      ? (position.split('_') as [TeamType, RoleType])
      : ['', ''];

    return [...formattedPosition, position];
  },
});
