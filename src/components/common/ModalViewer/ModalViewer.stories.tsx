import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSetRecoilState } from 'recoil';
import ModalViewer from './ModalViewer.component';
import { Button, Toast } from '@/components';
import { $modalByStorage, $toast, ModalKey } from '@/store';
import { ApplicationConfirmationStatusInDto, ApplicationResultStatusInDto } from '@/types';

const mockApplication = {
  applicant: {
    applicantId: 0,
    createdAt: '2022-02-19T10:06:37.439Z',
    email: 'string',
    name: 'string',
    phoneNumber: 'string',
    status: 'ACTIVE',
    updatedAt: '2022-02-19T10:06:37.439Z',
  },
  applicationId: 0,
  confirmationStatus: ApplicationConfirmationStatusInDto.FINAL_CONFIRM_ACCEPTED,
  createdAt: '2022-02-19T10:06:37.439Z',
  result: {
    interviewEndedAt: '2022-02-19T10:06:37.439Z',
    interviewStartedAt: '2022-02-19T10:06:37.439Z',
    status: ApplicationResultStatusInDto.INTERVIEW_FAILED,
  },
  team: {
    createdAt: '2022-02-19T10:06:37.439Z',
    createdBy: 'string',
    name: 'string',
    teamId: 0,
    updatedAt: '2022-02-19T10:06:37.439Z',
    updatedBy: 'string',
  },
  updatedAt: '2022-02-19T10:06:37.439Z',
  submittedAt: '2022-02-19T10:06:37.439Z',
};

export default {
  title: 'Modal Viewer',
} as ComponentMeta<typeof ModalViewer>;

const Template: ComponentStory<typeof ModalViewer> = () => {
  const handleControlAlertModal = useSetRecoilState($modalByStorage(ModalKey.alertModalDialog));
  const handleControlSmsSendModal = useSetRecoilState($modalByStorage(ModalKey.smsSendModalDialog));
  const handleControlChangeResultModal = useSetRecoilState(
    $modalByStorage(ModalKey.changeResultModalDialog),
  );
  const handleControlSmsSendDetailInfoModal = useSetRecoilState(
    $modalByStorage(ModalKey.smsSendDetailInfoModalDialog),
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
              heading: 'SMS ?????? ??????',
              paragraph: 'SMS ???????????? ???????????? ?????????????????????????',
              cancelButtonLabel: '??????',
              confirmButtonLabel: '??????',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        SMS ?????? ?????? ????????????
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '????????? ??????????????????????',
              paragraph: '?????? ?????? ???????????? ???????????? ???????????????.',
              cancelButtonLabel: '??????',
              confirmButtonLabel: '??????',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        ?????? ?????? ????????????
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '?????????????????????????',
              paragraph: '?????? ?????? ???????????? ???????????? ???????????????.',
              cancelButtonLabel: '??????',
              confirmButtonLabel: '??????',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        ???????????? ??????
      </Button>
      <Button
        onClick={() =>
          handleControlAlertModal({
            key: ModalKey.alertModalDialog,
            props: {
              heading: '?????????????????????????',
              paragraph: '????????? ????????? ???????????? ???????????? ??? ????????????.',
              cancelButtonLabel: '??????',
              confirmButtonLabel: '??????',
              handleClickConfirmButton: () => {},
            },
            isOpen: true,
          })
        }
      >
        ???????????? ??????
      </Button>
      <Button
        onClick={() =>
          handleControlChangeResultModal({
            key: ModalKey.changeResultModalDialog,
            props: {
              selectedApplications: [mockApplication],
            },
            isOpen: true,
          })
        }
      >
        ?????? ?????? ?????? ??????
      </Button>
      <Button
        onClick={() =>
          handleControlSmsSendModal({
            key: ModalKey.smsSendModalDialog,
            props: {
              selectedApplications: [mockApplication],
            },
            isOpen: true,
          })
        }
      >
        SMS ??????
      </Button>
      <Button
        onClick={() =>
          handleControlSmsSendModal({
            key: ModalKey.smsSendModalDialog,
            props: {
              selectedApplications: [mockApplication],
            },
            isOpen: true,
          })
        }
      >
        SMS ??????(?????????)
      </Button>
      <Button
        onClick={() =>
          handleControlSmsSendDetailInfoModal({
            key: ModalKey.smsSendDetailInfoModalDialog,
            isOpen: true,
          })
        }
      >
        SMS ?????? ????????????
      </Button>
    </div>
  );
};

export const modalViewer = Template.bind({});
