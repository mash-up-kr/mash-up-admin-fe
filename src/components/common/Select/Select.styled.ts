import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { ValueOf } from '@/types';
import { SelectPosition, SelectSize } from './Select.component';

interface StyledSelectContainerProps {
  isFullWidth: boolean;
}

interface StyledSelectProps {
  position: ValueOf<typeof SelectPosition>;
  isOpened: boolean;
  size: ValueOf<typeof SelectSize>;
  disabled: boolean;
}

interface StyledSelectMenuProps {
  isOpened: boolean;
  position: ValueOf<typeof SelectPosition>;
}

interface StyledSelectOptionProps {
  isSelected: boolean;
}

const getSelectStyle = (
  position: ValueOf<typeof SelectPosition>,
  isOpened: boolean,
  theme: Theme,
) => {
  if (!isOpened) {
    return css`
      border-radius: 0.9rem;
    `;
  }

  if (position === SelectPosition.bottom) {
    return css`
      border: 0.1rem solid ${theme.colors.purple70};
      border-radius: 0.9rem 0.9rem 0 0;
    `;
  }

  if (position === SelectPosition.top) {
    return css`
      border: 0.1rem solid ${theme.colors.purple70};
      border-radius: 0 0 0.9rem 0.9rem;
    `;
  }
};

export const SelectContainer = styled.div<StyledSelectContainerProps>`
  ${({ isFullWidth }) => css`
    position: relative;
    display: inline-flex;
    flex-direction: column-reverse;
    min-width: 16rem;

    ${isFullWidth
      ? css`
          width: 100%;
        `
      : css``}
  `}
`;

export const Select = styled.div<StyledSelectProps>`
  ${({ theme, size, isOpened, position, disabled }) => css`
    ${theme.select.size[size]};

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1.2rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0.9rem;
    cursor: pointer;

    svg {
      transform: ${isOpened ? 'rotate(180deg)' : 'rotate(0deg)'};
    }

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }

    ${getSelectStyle(position, isOpened, theme)}

    ${disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.5;
          user-select: none;
        `
      : css``}
  `}
`;

export const SelectPlaceholder = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray50};
  `}
`;

export const SelectValue = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray80};
  `}
`;

export const SelectMenu = styled.ul<StyledSelectMenuProps>`
  ${({ theme, isOpened, position }) => css`
    position: absolute;
    z-index: ${theme.zIndex.select};
    display: ${isOpened ? 'block' : 'none'};
    width: 100%;
    padding: 0.8rem;
    background-color: ${theme.colors.white};

    ${position === SelectPosition.top
      ? css`
          bottom: 100%;
          border-top: 0.1rem solid ${theme.colors.gray30};
          border-right: 0.1rem solid ${theme.colors.gray30};
          border-left: 0.1rem solid ${theme.colors.gray30};
          border-radius: 1.1rem 1.1rem 0 0;
        `
      : css`
          top: 100%;
          border-right: 0.1rem solid ${theme.colors.gray30};
          border-bottom: 0.1rem solid ${theme.colors.gray30};
          border-left: 0.1rem solid ${theme.colors.gray30};
          border-radius: 0 0 1.1rem 1.1rem;
        `}
  `}
`;

export const SelectOption = styled.li<StyledSelectOptionProps>`
  ${({ theme, isSelected }) => css`
    ${isSelected ? theme.fonts.medium14 : theme.fonts.regular14};

    padding: 0.8rem 1.2rem;
    color: ${isSelected ? theme.colors.purple70 : theme.colors.gray80};
    background-color: ${theme.colors.white};
    border-radius: 0.9rem;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.gray10};
    }
  `}
`;

export const HiddenSelect = styled.select`
  display: none;
`;
