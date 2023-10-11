import { useMemo } from 'react'

import {
  ListSearchResponse,
  ListState,
  useListsEnabledState,
  useRemoveTokenList,
  useToggleListCallback,
} from '@cowprotocol/tokens'

import * as styledEl from './styled'

import { useAddListImport } from '../../hooks/useAddListImport'
import { ImportTokenListItem } from '../../pure/ImportTokenListItem'
import { ListItem } from '../../pure/ListItem'

interface ListSearchState {
  source: 'existing' | 'external'
  loading: boolean
  listToImport: ListState | null
}

export interface ManageListsProps {
  lists: ListState[]
  listSearchResponse: ListSearchResponse
}

export function ManageLists(props: ManageListsProps) {
  const { lists, listSearchResponse } = props

  const activeTokenListsIds = useListsEnabledState()
  const addListImport = useAddListImport()
  const removeCustomTokenLists = useRemoveTokenList()
  const toggleList = useToggleListCallback()

  const { source, listToImport } = useListSearchResponse(listSearchResponse)

  // TODO: add loading state
  return (
    <styledEl.Wrapper>
      {listToImport && (
        <styledEl.ImportListsContainer>
          <ImportTokenListItem
            source={source}
            list={listToImport}
            importList={() => listToImport && addListImport(listToImport)}
          />
        </styledEl.ImportListsContainer>
      )}
      <styledEl.ListsContainer id="tokens-lists-table">
        {lists
          .sort((a, b) => (a.priority || 0) - (b.priority || 0))
          .map((list) => (
            <ListItem
              key={list.id}
              list={list}
              enabled={!!activeTokenListsIds[list.id]}
              removeList={removeCustomTokenLists}
              toggleList={toggleList}
            />
          ))}
      </styledEl.ListsContainer>
    </styledEl.Wrapper>
  )
}

function useListSearchResponse(listSearchResponse: ListSearchResponse): ListSearchState {
  return useMemo(() => {
    const { source, response } = listSearchResponse

    if (source === 'existing') {
      return {
        source,
        loading: false,
        listToImport: response,
      }
    }

    if (!response) {
      return { source, loading: false, listToImport: null }
    }

    const { isLoading, data } = response

    return {
      source,
      loading: isLoading,
      listToImport: data || null,
    }
  }, [listSearchResponse])
}
