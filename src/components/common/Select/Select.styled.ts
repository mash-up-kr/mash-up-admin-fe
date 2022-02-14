import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ValueOf } from '@/types';
import { SelectSize } from './Select.component';

interface StyledSelectProps {
  isOpened: boolean;
  size: ValueOf<typeof SelectSize>;
}

interface StyledSelectMenuProps {
  isOpened: boolean;
}

interface StyledSelectOptionProps {
  isSelected: boolean;
}

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 35rem;
`;

export const Select = styled.div<StyledSelectProps>`
  ${({ theme, size, isOpened }) => css`
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

    ${isOpened
      ? css`
          border: 0.1rem solid ${theme.colors.purple70};
          border-radius: 0.9rem 0.9rem 0 0;
        `
      : css`
          border-radius: 0.9rem;
        `}
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
  ${({ theme, isOpened }) => css`
    position: absolute;
    display: ${isOpened ? 'block' : 'none'};
    width: 100%;
    padding: 0.8rem;
    background-color: ${theme.colors.white};
    border-right: 0.1rem solid ${theme.colors.gray30};
    border-bottom: 0.1rem solid ${theme.colors.gray30};
    border-left: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0 0 1.1rem 1.1rem;
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
