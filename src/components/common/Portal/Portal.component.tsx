import { ReactNode, ReactPortal, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface Children {
  children?: ReactNode;
}

const PORTAL_ID = 'portal';

const Portal = ({ children }: Children): ReactPortal | null => {
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
      if (selectedPortalElement && selectedPortalElement.children.length === 1) {
        document.body.removeChild(selectedPortalElement);
      }
    };
  }, []);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

export default Portal;
