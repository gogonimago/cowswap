import styled from 'styled-components'

import { UI } from 'common/constants/theme'

export const SelectDropdown = styled.select`
  border-radius: 12px;
  padding: 8px 34px 8px 8px;
  border-radius: 12px;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  width: 100%;
  outline: none;
  border: 1px solid var(${UI.COLOR_BORDER});
  color: var(${UI.COLOR_TEXT1});
  background: linear-gradient(45deg, transparent 50%, var(${UI.COLOR_LIGHT_BLUE}) 50%) calc(100% - 13px) calc(13px) / 5px
      5px no-repeat,
    linear-gradient(135deg, var(${UI.COLOR_LIGHT_BLUE}) 50%, transparent 50%) calc(100% - 8px) calc(13px) / 5px 5px
      no-repeat,
    linear-gradient(to right, var(${UI.COLOR_LIGHT_BLUE_OPACITY_90}), var(${UI.COLOR_LIGHT_BLUE_OPACITY_90})) 100% 0 /
      26px 100% no-repeat;

  &:hover {
    background: linear-gradient(45deg, transparent 50%, var(${UI.COLOR_LIGHT_BLUE}) 50%) calc(100% - 13px) calc(13px) /
        5px 5px no-repeat,
      linear-gradient(135deg, var(${UI.COLOR_LIGHT_BLUE}) 50%, transparent 50%) calc(100% - 8px) calc(13px) / 5px 5px
        no-repeat,
      linear-gradient(to right, var(${UI.COLOR_LIGHT_BLUE_OPACITY_80}), var(${UI.COLOR_LIGHT_BLUE_OPACITY_80})) 100% 0 /
        26px 100% no-repeat;
  }
`
