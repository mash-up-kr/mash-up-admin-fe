import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './ModalWrapper.styled';

import { Button } from '@/components';
import { ButtonSize, ButtonShape, ButtonShapeType } from '@/components/common/Button/Button';

import CloseIcon from '@/assets/svg/close-icon.svg';

interface Children {
  children?: React.ReactChild;
}

export interface ModalProps extends Children {
  headerText?: string;
  footer: {
    leftButton: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: () => void;
    };
    rightButton?: {
      shape?: ButtonShapeType;
      label?: string;
      onClick: () => void;
    };
  };
  handleCloseModal: () => void;
}

const PORTAL_ID = 'portal';

export const Portal = ({ children }: Children): React.ReactPortal | null => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
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
              <span>{headerText}</span>
              <Button Icon={CloseIcon} shape={ButtonShape.icon} />
            </Styled.ModalHeader>
          )}
          <Styled.ModalContent>{children}</Styled.ModalContent>
          {footer && (
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
          )}
        </Styled.ModalCard>
      </Styled.Overlay>
    </Portal>
  );
};

export default ModalWrapper;
