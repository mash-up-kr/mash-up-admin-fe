import React, {
  MouseEventHandler,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  Suspense,
} from 'react';
import * as Styled from './ModalWrapper.styled';

import { Button, Portal } from '@/components';
import {
  ButtonSize,
  ButtonShape,
  ButtonShapeType,
} from '@/components/common/Button/Button.component';

import CloseIcon from '@/assets/svg/popup-close-44.svg';
import { ValueOf } from '@/types';
import { Children } from '../Portal/Portal.component';

export const Position = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export type PositionType = ValueOf<typeof Position>;

export interface ModalProps extends Children {
  className?: string;
  heading?: string;
  footer: {
    cancelButton?: {
      shape?: ButtonShapeType;
      label?: string;
      onClick?: MouseEventHandler<HTMLButtonElement>;
    };
    confirmButton?: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
      isLoading?: boolean;
      disabled?: boolean;
    };
    position?: PositionType;
  };
  handleCloseModal: Dispatch<SetStateAction<void>> | any;
  closeOnClickOverlay?: boolean;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
  isContentScroll?: boolean;
}

const MAIN_ID = 'root';

const ModalWrapper = ({
  className,
  children,
  heading,
  footer,
  handleCloseModal,
  closeOnClickOverlay = true,
  beforeRef,
  isContentScroll = true,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $rootNode = document.getElementById(MAIN_ID);
    $rootNode?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'hidden';

    const handleModalCloseWithEscHandler = ({ key }: KeyboardEvent) => {
      let scheduledAnimationFrame = false;

      if (scheduledAnimationFrame) {
        return;
      }

      scheduledAnimationFrame = true;

      if (key === 'Escape') {
        handleCloseModal();
        scheduledAnimationFrame = false;
      }
    };

    window.addEventListener('keyup', handleModalCloseWithEscHandler);

    const handleFocusTrap = (e: KeyboardEvent) => {
      const focusableNodeList = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input, button, textarea, select, [href] [tabindex]',
      );

      if (focusableNodeList) {
        const firstFocusableNode = focusableNodeList[0];
        const lastFocusableNode = focusableNodeList[focusableNodeList.length - 1];

        if (e.target === firstFocusableNode && e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          lastFocusableNode.focus();
        }
        if (e.target === lastFocusableNode && !e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          firstFocusableNode.focus();
        }
      }
    };

    dialogRef.current?.focus();

    window.addEventListener('keydown', handleFocusTrap);

    const beforeRefSnapshot = beforeRef;

    return () => {
      $rootNode?.removeAttribute('aria-hidden');
      document.body.style.overflow = 'unset';

      window.removeEventListener('keyup', handleModalCloseWithEscHandler);
      window.removeEventListener('keydown', handleFocusTrap);

      beforeRefSnapshot?.current.focus();
    };
  }, [beforeRef, handleCloseModal]);

  return (
    <Suspense fallback={null}>
      <Portal>
        <Styled.Overlay
          onClick={(e) => {
            if (e.target === e.currentTarget && closeOnClickOverlay) {
              handleCloseModal();
            }
          }}
          tabIndex={-1}
        >
          <Styled.ModalCard ref={dialogRef} className={className}>
            {heading && (
              <Styled.ModalHeader>
                <h2>{heading}</h2>
              </Styled.ModalHeader>
            )}
            <Styled.ModalContent isContentScroll={isContentScroll}>{children}</Styled.ModalContent>

            <Styled.ModalFooter position={footer.position || Position.right}>
              {footer?.cancelButton && (
                <Button
                  $size={ButtonSize.sm}
                  shape={ButtonShape.defaultLine}
                  {...footer.cancelButton}
                  onClick={
                    footer.cancelButton.onClick
                      ? footer.cancelButton.onClick
                      : () => handleCloseModal()
                  }
                />
              )}
              {footer?.confirmButton && (
                <Button
                  $size={ButtonSize.sm}
                  shape={ButtonShape.primary}
                  {...footer.confirmButton}
                />
              )}
            </Styled.ModalFooter>
            {heading && (
              <Button
                Icon={CloseIcon}
                shape={ButtonShape.icon}
                onClick={() => handleCloseModal()}
              />
            )}
          </Styled.ModalCard>
        </Styled.Overlay>
      </Portal>
    </Suspense>
  );
};

export default ModalWrapper;
