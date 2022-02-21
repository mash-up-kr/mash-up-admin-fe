import React from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Styled from './TeamNavigationTabs.styled';

const TEAMS = ['All', 'Design', 'Android', 'iOS', 'Web', 'Node', 'Spring'];

const TeamNavigationTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickTab = (teamParam: string) => {
    if (teamParam) {
      searchParams.set('team', teamParam);
    } else {
      searchParams.delete('team');
    }
    setSearchParams(searchParams);
  };

  return (
    <Styled.Tabs>
      {TEAMS.map((team, index) => {
        const teamParam = team === 'All' ? '' : team.toLocaleLowerCase();
        const active =
          team === 'All' ? !searchParams.has('team') : searchParams.get('team') === teamParam;

        return (
          <Styled.Tab
            key={index}
            role="link"
            aria-label={`${team} tab`}
            aria-current={active}
            active={active}
            onClick={() => handleClickTab(teamParam)}
          >
            {team}
          </Styled.Tab>
        );
      })}
    </Styled.Tabs>
  );
};

export default TeamNavigationTabs;
