import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputField } from '../../fields';

export const ApplicationFormItemContainer = styled.div`
  padding: 2.4rem 3.2rem;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 0.6rem;
  }
`;

export const ApplicationFormItemIndex = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium16};

    color: ${theme.colors.gray70};
  `}
`;

export const ApplicationFormItemQuestionInput = styled(InputField)`
  margin-left: 1.2rem;
`;

export const MaxContentSizeContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-left: 1.2rem;

    & > span {
      ${theme.fonts.medium13};

      margin-left: 0.4rem;
      color: ${theme.colors.gray60};
    }

    input {
      width: 9rem;
      margin-left: 0.8rem;
    }
  `}
`;

export const IconButton = styled.button`
  margin-left: auto;
  background-color: inherit;
`;

export const Divider = styled.span`
  ${({ theme }) => css`
    width: 0.1rem;
    height: 2rem;
    margin: 0 1.2rem;
    background-color: ${theme.colors.gray30};
  `}
`;

export const RequiredContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    & > span {
      ${theme.fonts.medium15};

      margin-right: 0.8em;
      color: ${theme.colors.gray70};
    }
  `}
`;
