import { initializeConnector } from '@web3-react/core'
import { Network } from '@web3-react/network'

import { ConnectionType } from '../../api/types'
import { Web3ReactConnection } from '../types'
import { getCurrentChainIdFromUrl } from '@cowswap/common-utils'
import { RPC_URLS } from '@cowswap/common-const'

const defaultChainId = getCurrentChainIdFromUrl()

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: RPC_URLS, defaultChainId })
)
export const networkConnection: Web3ReactConnection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
}
