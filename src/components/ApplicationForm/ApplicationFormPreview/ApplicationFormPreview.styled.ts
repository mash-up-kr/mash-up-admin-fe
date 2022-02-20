import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox, Input, ModalWrapper, Textarea } from '@/components';

export const ApplicationFormPreview = styled.div`
  padding: 0 2.4rem 2.4rem;
`;

export const CustomModalWrapper = styled(ModalWrapper)`
  width: 100rem;
`;

export const CategoryHeadline = styled.h3`
  ${({ theme }) => css`
    margin-top: 2.4rem;
    color: ${theme.colors.gray80};
    font-weight: bold;
    font-size: 2.4rem;
    line-height: 3rem;
  `}
`;

export const CustomInput = styled(Input)`
  margin-top: 2.4rem;
`;

export const CustomTextarea = styled(Textarea)`
  margin-top: 2.4rem;
`;

export const Description = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    margin-top: 0.6rem;
    color: ${theme.colors.gray60};
  `}
`;

export const PrivacyCheckBox = styled(Checkbox)`
  margin-top: 3.6rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 41.6rem;
  margin-top: 3.6rem;
`;

export const Col = styled.div`
  display: flex;
  margin-bottom: 1.6rem;

  button {
    flex: 1;
  }

  button:nth-of-type(2) {
    margin-left: 1.6rem;
  }
`;
