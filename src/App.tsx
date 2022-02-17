import React from 'react';

import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { theme, globalStyles } from '@/styles';

import { Button, ModalViewer } from '@/components';
import { $modalByStorage, ModalKey } from './store';
import {
  POPUP_CLOSE,
  SMS_COMPLETE,
} from './components/common/AlertModalDialog/AlertModalDialog.component';

const App = () => {
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.alertModalDialog));
  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <div>
          <Button
            onClick={() =>
              setModal({
                ...modal,
                props: SMS_COMPLETE,
                isOpen: true,
              })
            }
          >
            SMS 발송 완료 알럿모달
          </Button>
          <Button
            onClick={() =>
              setModal({
                ...modal,
                props: POPUP_CLOSE,
                isOpen: true,
              })
            }
          >
            팝업 닫기 알럿모달
          </Button>
          <ModalViewer />
        </div>
        <ModalViewer />
      </ThemeProvider>
    </>
  );
};

export default App;
