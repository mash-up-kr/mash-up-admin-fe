import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRecoilState } from 'recoil';
import ModalViewer from './ModalViewer.component';
import { Button } from '@/components';
import { $modalByStorage, ModalKey } from '@/store';

export default {
  title: 'Modal Viewer',
} as ComponentMeta<typeof ModalViewer>;

const Template: ComponentStory<typeof ModalViewer> = () => {
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.alertModalDialog));
  const [smsSendModal, setSmsSendModal] = useRecoilState(
    $modalByStorage(ModalKey.smsSendModalDialog),
  );

  return (
    <div>
      <Button
        onClick={() =>
          setModal({
            ...modal,
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
          setModal({
            ...modal,
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
          setModal({
            ...modal,
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
          setModal({
            ...modal,
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
          setSmsSendModal({
            ...smsSendModal,
            props: {
              id: '0',
            },
            isOpen: true,
          })
        }
      >
        저장하기 모달
      </Button>
      <ModalViewer />
    </div>
  );
};

export const modalViewer = Template.bind({});
