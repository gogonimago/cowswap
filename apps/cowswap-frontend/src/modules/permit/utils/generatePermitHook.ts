import { GP_VAULT_RELAYER } from '@cowprotocol/common-const'
import { Web3Provider } from '@ethersproject/providers'

import { buildDaiLikePermitCallData, buildEip2162PermitCallData } from './buildPermitCallData'
import { getPermitDeadline } from './getPermitDeadline'

import { DEFAULT_PERMIT_GAS_LIMIT, DEFAULT_PERMIT_VALUE, PERMIT_SIGNER } from '../const'
import { PermitHookData, PermitHookParams } from '../types'

const REQUESTS_CACHE: { [permitKey: string]: Promise<PermitHookData> } = {}

export async function generatePermitHook(params: PermitHookParams): Promise<PermitHookData> {
  const permitKey = getCacheKey(params)

  const cachedRequest = REQUESTS_CACHE[permitKey]

  if (cachedRequest) {
    try {
      return await cachedRequest
    } catch (e) {
      console.debug(`[generatePermitHookWith] cached request failed`, e)
      delete REQUESTS_CACHE[permitKey]
    }
  }

  const request = generatePermitHookRaw(params).then((permitHookData) => {
    // Remove consumed request to avoid stale data
    delete REQUESTS_CACHE[permitKey]

    return permitHookData
  })

  REQUESTS_CACHE[permitKey] = request

  return request
}

async function generatePermitHookRaw(params: PermitHookParams): Promise<PermitHookData> {
  const { inputToken, chainId, permitInfo, provider, account, eip2162Utils, nonce: preFetchedNonce } = params
  const tokenAddress = inputToken.address
  const tokenName = inputToken.name || tokenAddress

  const owner = account || PERMIT_SIGNER.address

  // Only fetch the nonce in case it wasn't pre-fetched before
  // That's the case for static account
  const nonce = preFetchedNonce === undefined ? await eip2162Utils.getTokenNonce(tokenAddress, owner) : preFetchedNonce

  const spender = GP_VAULT_RELAYER[chainId]
  const deadline = getPermitDeadline()
  const value = DEFAULT_PERMIT_VALUE

  const callData =
    permitInfo.type === 'eip-2612'
      ? await buildEip2162PermitCallData({
          eip2162Utils,
          callDataParams: [
            {
              owner,
              spender,
              value,
              nonce,
              deadline,
            },
            chainId as number,
            tokenName,
            tokenAddress,
            permitInfo.version,
          ],
        })
      : await buildDaiLikePermitCallData({
          eip2162Utils,
          callDataParams: [
            {
              holder: owner,
              spender,
              allowed: true,
              value,
              nonce,
              expiry: deadline,
            },
            chainId as number,
            tokenName,
            tokenAddress,
            permitInfo.version,
          ],
        })

  const gasLimit = await calculateGasLimit(callData, owner, tokenAddress, provider, !!account)

  return {
    target: tokenAddress,
    callData,
    gasLimit,
  }
}

async function calculateGasLimit(
  data: string,
  from: string,
  to: string,
  provider: Web3Provider,
  isUserAccount: boolean
): Promise<string> {
  try {
    // Query the actual gas estimate
    const actual = await provider.estimateGas({ data, from, to })

    // Add 10% to actual value to account for minor differences with real account
    // Do not add it if this is the real user's account
    const gasLimit = !isUserAccount ? actual.add(actual.div(10)) : actual

    // Pick the biggest between estimated and default
    return gasLimit.gt(DEFAULT_PERMIT_GAS_LIMIT) ? gasLimit.toString() : DEFAULT_PERMIT_GAS_LIMIT
  } catch (e) {
    console.debug(`[calculatePermitGasLimit] Failed to estimateGas, using default`, e)

    return DEFAULT_PERMIT_GAS_LIMIT
  }
}

function getCacheKey(params: PermitHookParams): string {
  const { inputToken, chainId, account } = params

  return `${inputToken.address.toLowerCase()}-${chainId}${account ? `-${account.toLowerCase()}` : ''}`
}
