export const ScoreType = {
  ATTENDANCE: 'ATTENDANCE',
  LATE: 'LATE',
  ABSENT: 'ABSENT',
  PRESENTATION: 'PRESENTATION',
  PROJECT_SUCCESS: 'PROJECT_SUCCESS',
  PROJECT_FAIL: 'PROJECT_FAIL',
  CONTENTS_WRITE: 'CONTENTS_WRITE',
  LEADER: 'LEADER',
  SUB_LEADER: 'SUB_LEADER',
  STAFF: 'STAFF',
  PROJECT_LEADER: 'PROJECT_LEADER',
  PROJECT_SUB_LEADER: 'PROJECT_SUB_LEADER',
  PREPARE: 'PREPARE',
} as const;

export const ScoreTitle = {
  [ScoreType.ATTENDANCE]: '전체 세미나 출석',
  [ScoreType.LATE]: '전체 세미나 지각',
  [ScoreType.ABSENT]: '전체 세미나 결석',
  [ScoreType.PRESENTATION]: '전체 세미나 발표',
  [ScoreType.PROJECT_SUCCESS]: '프로젝트 배포 성공',
  [ScoreType.PROJECT_FAIL]: '프로젝트 배포 실패',
  [ScoreType.CONTENTS_WRITE]: '티스토리 글 작성',
  [ScoreType.LEADER]: '회장',
  [ScoreType.SUB_LEADER]: '부회장',
  [ScoreType.STAFF]: '스태프',
  [ScoreType.PROJECT_LEADER]: '프로젝트 팀장',
  [ScoreType.PROJECT_SUB_LEADER]: '프로젝트 부팀장',
  [ScoreType.PREPARE]: '준비 위원회',
};

export const RangeType = {
  Plus: 'Plus',
  Minus: 'Minus',
  Normal: 'Normal',
} as const;
