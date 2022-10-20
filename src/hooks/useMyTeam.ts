import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import { $profile } from '@/store';

const useMyTeam = () => {
  const [searchParams] = useSearchParams();

  const teamName = searchParams.get('team');
  const myTeamName = useRecoilValue($profile)[0];
  const isMyTeam = useMemo(
    () =>
      !teamName ||
      teamName.toLowerCase() === myTeamName.toLowerCase() ||
      myTeamName === 'BRANDING' ||
      myTeamName === 'MASHUP',
    [myTeamName, teamName],
  );

  return {
    isMyTeam,
  };
};

export default useMyTeam;
