import { useState } from 'react'

import { TokenListInfo } from '@cowprotocol/tokens'

import { Menu, MenuItem } from '@reach/menu-button'
import { Settings } from 'react-feather'

import { Toggle } from 'legacy/components/Toggle'

import * as styledEl from './styled'

import { IconButton } from '../commonElements'
import { TokenListDetails } from '../TokenListDetails'

export interface TokenListItemProps {
  list: TokenListInfo
  removeList(id: string): void
  viewList(id: string): void
}

export function TokenListItem(props: TokenListItemProps) {
  const { list, removeList, viewList } = props

  // TODO: bind logic
  const [isActive, setIsActive] = useState(list.enabled)

  return (
    <styledEl.Wrapper $enabled={isActive}>
      <TokenListDetails list={list}>
        <Menu>
          <styledEl.SettingsButton>
            <IconButton>
              <Settings size={12} />
            </IconButton>
          </styledEl.SettingsButton>
          <styledEl.SettingsContainer>
            <MenuItem onSelect={() => void 0}>
              <styledEl.ListVersion>{list.version}</styledEl.ListVersion>
            </MenuItem>
            <MenuItem onSelect={() => viewList(list.id)}>
              <styledEl.SettingsAction>View List</styledEl.SettingsAction>
            </MenuItem>
            <MenuItem onSelect={() => removeList(list.id)}>
              <styledEl.SettingsAction>Remove list</styledEl.SettingsAction>
            </MenuItem>
          </styledEl.SettingsContainer>
        </Menu>
      </TokenListDetails>
      <div>
        <Toggle isActive={isActive} toggle={() => setIsActive((state) => !state)} />
      </div>
    </styledEl.Wrapper>
  )
}
