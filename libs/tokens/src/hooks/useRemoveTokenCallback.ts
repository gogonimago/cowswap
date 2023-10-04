import { TokenWithLogo } from '@cowprotocol/common-const'
import { useSetAtom } from 'jotai'
import { removeUserTokenAtom } from '../state/userAddedTokensAtom'

export function useRemoveTokenCallback(): (token: TokenWithLogo) => void {
  const removeUserToken = useSetAtom(removeUserTokenAtom)

  return (token: TokenWithLogo) => {
    removeUserToken(token)
  }
}
