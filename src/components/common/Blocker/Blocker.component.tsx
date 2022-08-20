import React from 'react';
import { usePrompt } from '@/hooks';
import { AlertModalDialog } from '..';

interface PromptProps {
  isBlocking?: boolean;
}

const Blocker = ({ isBlocking = true }: PromptProps) => {
  const { showPrompt, confirmNavigation, cancelNavigation } = usePrompt(isBlocking);

  if (!showPrompt) {
    return null;
  }

  return (
    <AlertModalDialog
      heading="삭제하시겠습니까?"
      paragraph="작성 또는 수정하신 데이터가 삭제됩니다."
      cancelButtonLabel="취소"
      confirmButtonLabel="닫기"
      handleClickCancelButton={cancelNavigation}
      handleClickConfirmButton={confirmNavigation}
    />
  );
};

export default Blocker;
