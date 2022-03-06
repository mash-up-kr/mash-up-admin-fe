import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSetRecoilState } from 'recoil';
import ModalViewer from './ModalViewer.component';
import { Button, Toast } from '@/components';
import { $modalByStorage, $toast, ModalKey } from '@/store';

export default {
  title: 'Modal Viewer',
} as ComponentMeta<typeof ModalViewer>;

const Template: ComponentStory<typeof ModalViewer> = () => {
  const handleControlAlertModal = useSetRecoilState($modalByStorage(ModalKey.alertModalDialog));
  const handleControlSmsSendModal = useSetRecoilState($modalByStorage(ModalKey.smsSendModalDialog));
  const handleControlChangeResultModal = useSetRecoilState(
    $modalByStorage(ModalKey.changeResultModalDialog),
  );
  return (
    <div>
      <ModalViewer />
      {$toast && <Toast />}
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: 'SMS 발송 완료',
              paragraph: 'SMS 발송내역 페이지로 이동하시겠습니까?',
              cancelButtonLabel: '취소',
              confirmButtonLabel: '이동',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        SMS 발송 완료 알럿모달
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '팝업을 닫으시겠습니까?',
              paragraph: '변경 또는 작성하신 데이터가 삭제됩니다.',
              cancelButtonLabel: '취소',
              confirmButtonLabel: '닫기',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        팝업 닫기 알럿모달
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '삭제하시겠습니까?',
              paragraph: '작성 또는 수정하신 데이터가 삭제됩니다.',
              cancelButtonLabel: '취소',
              confirmButtonLabel: '닫기',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        삭제하기 모달
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '저장하시겠습니까?',
              paragraph: '지원서 설문지 내역에서 확인하실 수 있습니다.',
              cancelButtonLabel: '취소',
              confirmButtonLabel: '저장',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        저장하기 모달
      </Button>
      <Button
        onClick={() =>
          handleControlChangeResultModal({
            key: ModalKey.changeResultModalDialog,
            props: {
              selectedList: [0, 1, 2, 3, 4],
              selectedResults: ['SCREENING_PASSED', 'SCREENING_FAILED'],
            },
            isOpen: true,
          })
        }
      >
        합격 여부 상태 변경
      </Button>
      <Button
        onClick={() =>
          handleControlSmsSendModal({
            key: ModalKey.smsSendModalDialog,
            props: {
              selectedList: [0],
            },
            isOpen: true,
          })
        }
      >
        SMS 발송
      </Button>
      <Button
        onClick={() =>
          handleControlSmsSendModal({
            key: ModalKey.smsSendModalDialog,
            props: {
              selectedList: [0, 1, 2, 3, 4],
              confirmationStatus: 'FINAL_CONFIRM_ACCEPTED',
              resultStatus: 'SCREENING_PASSED',
            },
            isOpen: true,
          })
        }
      >
        SMS 발송(여러명)
      </Button>
    </div>
  );
};

export const modalViewer = Template.bind({});
