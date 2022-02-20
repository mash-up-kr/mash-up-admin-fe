import { atom, selector } from 'recoil';
import { LoginResponse, MemberPositionType } from '@/types/dto';
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
    get($me);
    return !!localStorage.getItem(ACCESS_TOKEN);
  },
});

export const $profile = selector<[string, string, MemberPositionType | undefined]>({
  key: 'profile',
  get: ({ get }) => {
    const { position } = get($me).adminMember;

    const formattedPosition: [string, string] = position
      ? (position.split('_') as [TeamType, RoleType])
      : ['', ''];

    return [...formattedPosition, position];
  },
});
