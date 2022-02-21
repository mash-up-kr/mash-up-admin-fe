import { atom, selectorFamily } from 'recoil';
import { TeamResponse } from '@/types';

export const $teams = atom<TeamResponse>({
  key: 'teams',
  default: [],
});

export const $teamIdByName = selectorFamily<string, string | null>({
  key: 'teamIdByName',
  get:
    (teamName) =>
    ({ get }) => {
      const teams = get($teams);
      return teams.reduce(
        (prevId, team) =>
          team.name.toLocaleLowerCase() === teamName?.toLocaleLowerCase()
            ? team.teamId.toString()
            : prevId,
        '',
      );
    },
});
