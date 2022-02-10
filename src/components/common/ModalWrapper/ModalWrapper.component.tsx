import React, { MouseEventHandler, ReactNode, ReactPortal, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './ModalWrapper.styled';

import { Button } from '@/components';
import {
  ButtonSize,
  ButtonShape,
  ButtonShapeType,
} from '@/components/common/Button/Button.component';

import CloseIcon from '@/assets/svg/close-icon.svg';

interface Children {
  children?: ReactNode;
}

export interface ModalProps extends Children {
  headerText?: string;
  footer: {
    leftButton: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
    };
    rightButton?: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
    };
  };
  handleCloseModal: MouseEventHandler<HTMLDivElement>;
}

const PORTAL_ID = 'portal';

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
  }, []);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

const ModalWrapper = ({ children, headerText, footer, handleCloseModal }: ModalProps) => {
  return (
    <Portal>
      <Styled.Overlay onClick={handleCloseModal}>
        <Styled.ModalCard>
          {headerText && (
            <Styled.ModalHeader>
              <h2>{headerText}</h2>
              <Button Icon={CloseIcon} shape={ButtonShape.icon} />
            </Styled.ModalHeader>
          )}
          <Styled.ModalContent>{children}</Styled.ModalContent>
          <Styled.ModalFooter>
            {footer?.leftButton && (
              <Button
                $size={ButtonSize.sm}
                shape={ButtonShape.defaultLine}
                {...footer.leftButton}
              />
            )}
            {footer?.rightButton && (
              <Button $size={ButtonSize.sm} shape={ButtonShape.primary} {...footer.rightButton} />
            )}
          </Styled.ModalFooter>
        </Styled.ModalCard>
      </Styled.Overlay>
    </Portal>
  );
};

export default ModalWrapper;
