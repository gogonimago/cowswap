import { getContract } from '@cowswap/common-utils'
import { ENS_REGISTRAR_ADDRESSES } from '@cowswap/common-const'
import { EnsAbi, EnsRegistrar } from '@cowswap/abis'
import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'

export function useENSRegistrarContract(): EnsRegistrar | undefined {
  const { provider, chainId } = useWeb3React()

  const { data } = useSWR(['useENSRegistrarContract', provider, chainId], () => {
    if (!chainId || !provider) return undefined

    const address = ENS_REGISTRAR_ADDRESSES[chainId]

    if (!address) return undefined

    return getContract(address, EnsAbi, provider) as EnsRegistrar
  })

  return data
}
