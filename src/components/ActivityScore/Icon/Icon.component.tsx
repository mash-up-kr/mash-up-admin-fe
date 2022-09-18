import React from 'react';

import Attendance from '@/assets/svg/attendance-44.svg';
import LATE from '@/assets/svg/late-44.svg';
import Absent from '@/assets/svg/absent-44.svg';
import Presentation from '@/assets/svg/presentation-44.svg';
import ProjectSuccess from '@/assets/svg/project-success-44.svg';
import ProjectFail from '@/assets/svg/project-fail-44.svg';
import ContentsWrite from '@/assets/svg/contents-write-44.svg';
import Leader from '@/assets/svg/leader-44.svg';
import SubLeader from '@/assets/svg/sub-leader-44.svg';
import Staff from '@/assets/svg/staff-44.svg';
import ProjectLeader from '@/assets/svg/project-leader-44.svg';
import ProjectSubLeader from '@/assets/svg/project-sub-leader-44.svg';
import Prepare from '@/assets/svg/prepare-44.svg';
import { ValueOf } from '@/types';
import { ScoreType } from '../constants';

const scoreIcon = {
  [ScoreType.ATTENDANCE]: <Attendance />,
  [ScoreType.LATE]: <LATE />,
  [ScoreType.ABSENT]: <Absent />,
  [ScoreType.PRESENTATION]: <Presentation />,
  [ScoreType.PROJECT_SUCCESS]: <ProjectSuccess />,
  [ScoreType.PROJECT_FAIL]: <ProjectFail />,
  [ScoreType.CONTENTS_WRITE]: <ContentsWrite />,
  [ScoreType.LEADER]: <Leader />,
  [ScoreType.SUB_LEADER]: <SubLeader />,
  [ScoreType.STAFF]: <Staff />,
  [ScoreType.PROJECT_LEADER]: <ProjectLeader />,
  [ScoreType.PROJECT_SUB_LEADER]: <ProjectSubLeader />,
  [ScoreType.PREPARE]: <Prepare />,
};

interface IconProps {
  type: ValueOf<typeof ScoreType>;
}

const Icon = ({ type }: IconProps) => {
  return scoreIcon[type];
};

export default Icon;
