import { useMemo } from 'react'
import { useWeb3React } from '@cow/common/hooks/useWeb3React'
import { CHAIN_INFO } from 'constants/chainInfo'
import { supportedChainId } from 'utils/supportedChainId'

export default function useNetworkName(): string | undefined {
  const { chainId } = useWeb3React()

  const network = useMemo(() => {
    const currentChainId = supportedChainId(chainId)
    return currentChainId ? CHAIN_INFO[currentChainId].label : ''
  }, [chainId])

  return network
}
