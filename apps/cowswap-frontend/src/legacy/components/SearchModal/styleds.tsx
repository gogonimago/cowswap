import { LoadingRows as BaseLoadingRows, RowBetween } from '@cowprotocol/ui'

import styled from 'styled-components/macro'

import { UI } from 'common/constants/theme'

import { AutoColumn } from '../Column'

export const TextDot = styled.div`
  height: 3px;
  width: 3px;
  background-color: var(${UI.COLOR_TEXT2});
  border-radius: 50%;
`

export const Checkbox = styled.input`
  border: 1px solid ${({ theme }) => theme.red3};
  height: 20px;
  margin: 0;
`

export const PaddedColumn = styled(AutoColumn)`
  padding: 20px;
`

export const PaddedRow = styled(RowBetween)`
  padding: 20px;
  padding-bottom: 0;
`

export const MenuItem = styled(RowBetween)`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.bg2};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  border: none;
  outline: none;
  border-style: solid;
  background: var(${UI.COLOR_GREY});
  color: var(${UI.COLOR_TEXT1});
  border: 1px solid var(${UI.COLOR_BORDER});
  appearance: none;
  font-size: 16px;
  border-radius: 12px;

  ::placeholder {
    color: var(${UI.COLOR_TEXT1});
    opacity: 0.7;
  }

  transition: border 100ms;
  :focus {
    border: 1px solid var(${UI.COLOR_LINK});
    outline: none;
  }
`
export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg2};
`

export const SeparatorDark = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`

export const LoadingRows = styled(BaseLoadingRows)`
  grid-column-gap: 0.5em;
  grid-template-columns: repeat(12, 1fr);
  max-width: 960px;
  padding: 12px 20px;

  & > div:nth-child(4n + 1) {
    grid-column: 1 / 8;
    height: 1em;
    margin-bottom: 0.25em;
  }
  & > div:nth-child(4n + 2) {
    grid-column: 12;
    height: 1em;
    margin-top: 0.25em;
  }
  & > div:nth-child(4n + 3) {
    grid-column: 1 / 4;
    height: 0.75em;
  }
`
