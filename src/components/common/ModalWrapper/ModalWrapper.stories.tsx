import React, {
  Dispatch,
  MouseEventHandler,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalWrapper, { ModalProps } from './ModalWrapper.component';
import { Button } from '@/components';

export default {
  title: 'ModalWrapper',
} as ComponentMeta<typeof ModalWrapper>;

export const Template: ComponentStory<typeof ModalWrapper> = (args: ModalProps) => {
  const [mount, setMount] = useState<boolean>();
  const ref = useRef<HTMLButtonElement>(null) as MutableRefObject<HTMLButtonElement>;

  const handleCloseModal: Dispatch<SetStateAction<void>> = () => setMount(false);
  const handleSetMount: MouseEventHandler<HTMLButtonElement> = () => setMount((prev) => !prev);

  return (
    <div>
      <Button ref={ref} onClick={handleSetMount} label="modal 켜기" />
      {mount && <ModalWrapper {...args} beforeRef={ref} handleCloseModal={handleCloseModal} />}
    </div>
  );
};

Template.args = {
  heading: '모달 테스트',
  footer: {
    cancelButton: {
      label: '취소',
      onClick: () => {},
    },
    confirmButton: {
      label: '저장',
      onClick: () => {},
    },
  },
  handleCloseModal: () => {},
};
