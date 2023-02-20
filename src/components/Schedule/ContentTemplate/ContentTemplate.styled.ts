import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputField } from '@/components';

export const ContentTemplateContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 2.4rem 1.2rem 2.4rem 2.4rem;
`;

export const ContentTemplateWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ContentTemplateIndex = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
  `}
`;

export const ContentTemplateTitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const StartedAtInputField = styled(InputField)`
  width: 16rem;
`;

export const RemoveIcon = styled.button`
  background-color: transparent;
`;
