import { useEffect, useRef } from 'react';
import { utils, WorkBook } from 'xlsx';

interface UseExportXlsxProps<T> {
  workSheet: T[];
  teamName: string;
}

const useConvertToXlsx = <T>({ workSheet, teamName }: UseExportXlsxProps<T>) => {
  const workBookRef = useRef<WorkBook>(utils.book_new());
  useEffect(() => {
    if (workSheet) {
      workBookRef.current = utils.book_new();
      const sheet = utils.json_to_sheet(workSheet);
      utils.book_append_sheet(workBookRef.current, sheet, teamName || '전체');
    }
  }, [teamName, workSheet]);

  return { workBook: workBookRef.current };
};

export default useConvertToXlsx;
