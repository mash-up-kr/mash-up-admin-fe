export const ScoreType = {
  ATTENDANCE: 'ATTENDANCE',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  SEMINAR_PRESENTATION: 'SEMINAR_PRESENTATION',
  DEPLOY_SUCCESS: 'DEPLOY_SUCCESS',
  DEPLOY_FAILURE: 'DEPLOY_FAILURE',
  PROJECT_LEADER: 'PROJECT_LEADER',
  PROJECT_SUBLEADER: 'PROJECT_SUBLEADER',
  HACKATHON_COMMITTEE: 'HACKATHON_COMMITTEE',
  MASHUP_STAFF: 'MASHUP_STAFF',
  MASHUP_LEADER: 'MASHUP_LEADER',
  MASHUP_SUBLEADER: 'MASHUP_SUBLEADER',
  MASHUP_CONTENT_WRITE: 'MASHUP_CONTENT_WRITE',
} as const;

export const ScoreTitle = {
  [ScoreType.ATTENDANCE]: '전체 세미나 출석',
  [ScoreType.ABSENT]: '전체 세미나 결석',
  [ScoreType.LATE]: '전체 세미나 지각',
  [ScoreType.SEMINAR_PRESENTATION]: '전체 세미나 발표',
  [ScoreType.DEPLOY_SUCCESS]: '프로젝트 배포 성공',
  [ScoreType.DEPLOY_FAILURE]: '프로젝트 배포 실패',
  [ScoreType.PROJECT_LEADER]: '프로젝트 팀장',
  [ScoreType.PROJECT_SUBLEADER]: '프로젝트 부팀장',
  [ScoreType.HACKATHON_COMMITTEE]: '준비 위원회',
  [ScoreType.MASHUP_STAFF]: '스태프',
  [ScoreType.MASHUP_LEADER]: '회장',
  [ScoreType.MASHUP_SUBLEADER]: '부회장',
  [ScoreType.MASHUP_CONTENT_WRITE]: '블로그 콘텐츠 작성',
};

export const RangeType = {
  Plus: 'Plus',
  Minus: 'Minus',
  Normal: 'Normal',
} as const;
