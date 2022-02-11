import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const VisuallyHidden = css`
  position: absolute;
  display: inline-block;
  width: 0.1rem;
  height: 0.1rem;
  margin: -0.1rem;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0 0, 0 0, 0 0);
`;

export const VisuallyHiddenInputWrapper = styled.input`
  ${VisuallyHidden}
`;

export const VisuallyHiddenSpanWrapper = styled.span`
  ${VisuallyHidden}
`;
