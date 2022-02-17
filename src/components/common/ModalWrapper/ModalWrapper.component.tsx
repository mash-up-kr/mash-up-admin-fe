import React, {
  MouseEventHandler,
  ReactNode,
  ReactPortal,
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './ModalWrapper.styled';

import { Button } from '@/components';
import {
  ButtonSize,
  ButtonShape,
  ButtonShapeType,
} from '@/components/common/Button/Button.component';

import CloseIcon from '@/assets/svg/popup-close-44.svg';
import { ValueOf } from '@/types';

interface Children {
  children?: ReactNode;
}

export const Position = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export type PositionType = ValueOf<typeof Position>;

export interface ModalProps extends Children {
  heading?: string;
  footer: {
    cancelButton: {
      shape?: ButtonShapeType;
      label?: string;
      onClick?: MouseEventHandler<HTMLButtonElement>;
    };
    confirmButton?: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
    };
    position?: PositionType;
  };
  handleCloseModal: Dispatch<SetStateAction<void>>;
  closeOnClickOverlay?: boolean;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
}

const PORTAL_ID = 'portal';
const MAIN_ID = 'root';

export const Portal = ({ children }: Children): ReactPortal | null => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const portalElement = document.getElementById(PORTAL_ID);

    if (!portalElement) {
      const tempElement = document.createElement('div');

      tempElement.id = PORTAL_ID;

      document.body.appendChild(tempElement);
    }

    setElement(document.getElementById(PORTAL_ID));

    return () => {
      const selectedPortalElement = document.getElementById(PORTAL_ID);
      if (selectedPortalElement) {
        document.body.removeChild(selectedPortalElement);
      }
    };
  }, []);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

const ModalWrapper = ({
  children,
  heading,
  footer,
  handleCloseModal,
  closeOnClickOverlay = true,
  beforeRef,
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
    <Portal>
      <Styled.Overlay
        onClick={(e) => {
          if (e.target === e.currentTarget && closeOnClickOverlay) {
            handleCloseModal();
          }
        }}
        tabIndex={-1}
      >
        <Styled.ModalCard ref={dialogRef}>
          {heading && (
            <Styled.ModalHeader>
              <h2>{heading}</h2>
            </Styled.ModalHeader>
          )}
          <Styled.ModalContent>{children}</Styled.ModalContent>
          <Styled.ModalFooter position={footer.position || Position.right}>
            <Button
              $size={ButtonSize.sm}
              shape={ButtonShape.defaultLine}
              {...footer.cancelButton}
              onClick={
                footer.cancelButton.onClick ? footer.cancelButton.onClick : () => handleCloseModal()
              }
            />
            {footer?.confirmButton && (
              <Button $size={ButtonSize.sm} shape={ButtonShape.primary} {...footer.confirmButton} />
            )}
          </Styled.ModalFooter>
          <Button Icon={CloseIcon} shape={ButtonShape.icon} onClick={() => handleCloseModal()} />
        </Styled.ModalCard>
      </Styled.Overlay>
    </Portal>
  );
};

export default ModalWrapper;
