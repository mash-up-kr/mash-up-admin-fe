import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ApplicationPanelContainer = styled.aside`
  ${({ theme }) => css`
    width: 38.4rem;
    height: fit-content;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: 2rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);

    & > h3 {
      ${theme.fonts.bold24}
      margin-bottom: 2rem;
    }
  `}
`;

export const ApplicationStatusForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    & h4 {
      ${theme.fonts.medium15}
    }
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    height: 0.1rem;
    background-color: ${theme.colors.gray30};
  `}
`;

interface StyledSelectorContainerProps {
  disabled: boolean;
}

export const SelectContainer = styled.div<StyledSelectorContainerProps>`
  ${({ disabled }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    ${disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.5;
          pointer-events: none;
        `
      : css``}
  `}
`;

interface StyledSelectWrapperProps {
  isDatePickerOpened: boolean;
}

export const SelectWrapper = styled.div<StyledSelectWrapperProps>`
  ${({ theme, isDatePickerOpened }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.8rem;
    padding: 0.8rem 1.2rem;
    font-weight: 400;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-color: ${isDatePickerOpened ? theme.colors.purple70 : theme.colors.gray30};
    border-radius: 0.9rem;
    cursor: pointer;

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }
  `}
`;

interface StyledSelectMenuProps {
  isDatePickerOpened: boolean;
}

export const SelectMenu = styled.div<StyledSelectMenuProps>`
  ${({ theme, isDatePickerOpened }) => css`
    position: absolute;
    top: 4.8rem;
    left: 0;
    z-index: ${theme.zIndex.select};
    display: ${isDatePickerOpened ? 'block' : 'none'};
  `}
`;

export const SelectTimeField = styled.div`
  ul {
    height: 26.8rem;
    overflow-y: auto;
  }

  & div {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
`;
