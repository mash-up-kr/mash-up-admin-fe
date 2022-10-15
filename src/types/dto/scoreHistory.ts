import { ScoreType } from '@/components/ActivityScore';
import { ValueOf } from '../helper';

export interface ScoreHistoryAddRequest {
  date: string;
  generationNumber: number;
  memberId: number;
  memo: string;
  scoreType: ValueOf<typeof ScoreType>;
}

export interface ScoreHistoryCancelRequest {
  memo: string;
  scoreHistoryId: number;
}
