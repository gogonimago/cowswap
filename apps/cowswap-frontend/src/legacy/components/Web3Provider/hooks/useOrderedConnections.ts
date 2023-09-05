import { useMemo } from 'react'

import { useAppSelector } from 'legacy/state/hooks'

import { BACKFILLABLE_WALLETS, ConnectionType } from '../../../../../../../libs/wallet/src/api/types'
import { getWeb3ReactConnection } from '../../../../../../../libs/wallet/src/web3-react/utils/getWeb3ReactConnection'
import { isInjectedWidget } from '@cowswap/common-utils'

const SELECTABLE_WALLETS = [...BACKFILLABLE_WALLETS]

// TODO: The logic looks very similar with useEagerlyConnect
export function useOrderedConnections() {
  const selectedWallet = useAppSelector((state) => state.user.selectedWallet)
  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = []

    if (isInjectedWidget()) {
      orderedConnectionTypes.push(ConnectionType.INJECTED_WIDGET)
    }

    // Always attempt to use to Gnosis Safe first, as we can't know if we're in a SafeContext.
    orderedConnectionTypes.push(ConnectionType.GNOSIS_SAFE)

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet) {
      orderedConnectionTypes.push(selectedWallet)
    }
    orderedConnectionTypes.push(...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet))

    // Add network connection last as it should be the fallback.
    orderedConnectionTypes.push(ConnectionType.NETWORK)

    return orderedConnectionTypes.map(getWeb3ReactConnection)
  }, [selectedWallet])
}
