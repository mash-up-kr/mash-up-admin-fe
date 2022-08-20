import { useEffect, useRef } from 'react';
import { utils, WorkBook } from 'xlsx';

interface UseExportXlsxProps<T> {
  workSheet: T[];
  teamName: string;
  isLoading: boolean;
}

const useConvertToXlsx = <T>({ workSheet, teamName, isLoading }: UseExportXlsxProps<T>) => {
  const workBookRef = useRef<WorkBook>();

  useEffect(() => {
    if (workSheet) {
      workBookRef.current = utils.book_new();
      const sheet = utils.json_to_sheet(workSheet);
      utils.book_append_sheet(workBookRef.current, sheet, teamName);
    }
  }, [teamName, workSheet, isLoading]);

  return { getWorkBook: () => workBookRef.current };
};

export default useConvertToXlsx;
