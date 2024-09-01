import React from 'react';

import Attendance from '@/assets/svg/attendance-40.svg';
import LATE from '@/assets/svg/late-40.svg';
import Absent from '@/assets/svg/absent-40.svg';
import Presentation from '@/assets/svg/presentation-40.svg';
import ProjectSuccess from '@/assets/svg/project-success-40.svg';
import ProjectFail from '@/assets/svg/project-fail-40.svg';
import Leader from '@/assets/svg/leader-40.svg';
import SubLeader from '@/assets/svg/sub-leader-40.svg';
import Staff from '@/assets/svg/staff-40.svg';
import ProjectLeader from '@/assets/svg/project-leader-40.svg';
import ProjectSubLeader from '@/assets/svg/project-sub-leader-40.svg';
import Prepare from '@/assets/svg/prepare-40.svg';
import DefaultScore from '@/assets/svg/default-score-40.svg';
import ContentWrite from '@/assets/svg/content-write-40.svg';
import { ValueOf } from '@/types';
import { ScoreType } from '../constants';

const scoreIcon = {
  [ScoreType.ATTENDANCE]: <Attendance />,
  [ScoreType.LATE]: <LATE />,
  [ScoreType.ABSENT]: <Absent />,
  [ScoreType.SEMINAR_PRESENTATION]: <Presentation />,
  [ScoreType.ADD_SCORE_DURING_SEMINAR_ACTIVITY_0_5]: <Presentation />,
  [ScoreType.ADD_SCORE_DURING_SEMINAR_ACTIVITY_1]: <Presentation />,
  [ScoreType.DEPLOY_SUCCESS]: <ProjectSuccess />,
  [ScoreType.DEPLOY_FAILURE]: <ProjectFail />,
  [ScoreType.MASHUP_LEADER]: <Leader />,
  [ScoreType.MASHUP_SUBLEADER]: <SubLeader />,
  [ScoreType.MASHUP_STAFF]: <Staff />,
  [ScoreType.PROJECT_LEADER]: <ProjectLeader />,
  [ScoreType.PROJECT_SUBLEADER]: <ProjectSubLeader />,
  [ScoreType.HACKATHON_COMMITTEE]: <Prepare />,
  [ScoreType.DEFAULT]: <DefaultScore />,
  [ScoreType.MASHUP_CONTENT_WRITE]: <ContentWrite />,
};

interface IconProps {
  type: ValueOf<typeof ScoreType>;
  size?: number;
}

const Icon = ({ type, size = 44 }: IconProps) => {
  if (!scoreIcon[type]) return null;

  return React.cloneElement(scoreIcon[type], {
    width: size,
    height: size,
  });
};

export default Icon;
