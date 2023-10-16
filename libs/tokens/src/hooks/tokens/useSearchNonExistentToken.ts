import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { TokenWithLogo } from '@cowprotocol/common-const'
import { isTruthy } from '@cowprotocol/common-utils'

import { tokenListsUpdatingAtom } from '../../state/tokenLists/tokenListsStateAtom'
import { useSearchToken } from './useSearchToken'
import { useTokenBySymbolOrAddress } from './useTokenBySymbolOrAddress'

export function useSearchNonExistentToken(tokenId: string | null): TokenWithLogo | null {
  const tokenListsUpdating = useAtomValue(tokenListsUpdatingAtom)

  const existingToken = useTokenBySymbolOrAddress(tokenId)

  const inputTokenToSearch = tokenListsUpdating || existingToken ? null : tokenId

  const foundToken = useSearchToken(inputTokenToSearch)

  return useMemo(() => {
    if (!inputTokenToSearch) return null

    return (
      [foundToken.inactiveListsResult, foundToken.externalApiResult, foundToken.blockchainResult]
        .filter(isTruthy)
        .flat()
        .filter(isTruthy)[0] || null
    )
  }, [inputTokenToSearch, foundToken])
}
