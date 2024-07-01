import React from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Styled from './TeamNavigationTabs.styled';

const TEAMS = ['All', 'Design', 'Android', 'iOS', 'Web', 'Node', 'Spring'];

interface TeamNavigationTabsProps {
  allAltText?: string;
}

const TeamNavigationTabs = ({ allAltText }: TeamNavigationTabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickTab = (teamParam: string) => {
    if (teamParam) {
      searchParams.set('team', teamParam);
      searchParams.delete('page');
    } else {
      searchParams.delete('team');
    }
    setSearchParams(searchParams);
  };

  return (
    <Styled.Tabs>
      {TEAMS.map((team, index) => {
        const teamParam = team === 'All' ? '' : team.toUpperCase();
        const active =
          team === 'All' ? !searchParams.has('team') : searchParams.get('team') === teamParam;
        const isAllAltText = team === 'All' && !!allAltText;
        return (
          <Styled.Tab
            key={index}
            role="link"
            aria-label={`${team} tab`}
            aria-current={active}
            active={active}
            isAllAltText={isAllAltText}
            onClick={() => handleClickTab(teamParam)}
          >
            {isAllAltText ? allAltText : team}
          </Styled.Tab>
        );
      })}
    </Styled.Tabs>
  );
};

export default TeamNavigationTabs;
