import { atom } from 'recoil';
import { LoginResponse, MemberPositionType } from '@/types/dto';
import { TeamType, RoleType } from '@/components/common/UserProfile/UserProfile.component';
import { selectorWithRefresher } from './recoil';
import { ScoreType } from '@/components/ActivityScore';

export const $me = atom<LoginResponse>({
  key: 'me',
  default: {
    accessToken: '',
    adminMember: {
      adminMemberId: 0,
      phoneNumber: '',
      username: '',
      position: undefined,
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
    const { position } = get($me).adminMember ?? {};

    const formattedPosition: [string, string] = position
      ? (position.split('_') as [TeamType, RoleType])
      : ['', ''];

    return [...formattedPosition, position];
  },
});

const MASTER_SCORE_TYPES = [ScoreType.MASHUP_LEADER, ScoreType.MASHUP_SUBLEADER] as string[];

export const $isMaster = selectorWithRefresher<boolean>({
  key: 'isMaster',
  get: ({ get }) => {
    const { adminMember } = get($me);
    return MASTER_SCORE_TYPES.includes(adminMember?.position ?? '');
  },
});
