import { ScheduleStatus, ValueOf } from '@/types';

export const getScheduleStatusText = (status: ValueOf<typeof ScheduleStatus>) => {
  switch (status) {
    case ScheduleStatus.ADMIN_ONLY:
      return '-';
    case ScheduleStatus.PUBLIC:
      return '배포 완료';
    default:
      return '';
  }
};
