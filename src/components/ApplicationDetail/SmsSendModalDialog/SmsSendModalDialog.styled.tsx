import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Textarea } from '@/components';

export const SmsSendModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 50rem;
  padding: 1.2rem 2.4rem;
`;

export const CustomTextarea = styled(Textarea)`
  ${({ theme }) => css`
    width: 100%;

    & textarea {
      ${theme.fonts.regular13}

      color: ${theme.colors.gray70};
    }
  `}
`;
