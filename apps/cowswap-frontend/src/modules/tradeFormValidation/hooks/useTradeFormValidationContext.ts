import { useMemo } from 'react'

import { useENSAddress } from '@cowprotocol/ens'
import { useGnosisSafeInfo, useIsBundlingSupported, useWalletDetails, useWalletInfo } from '@cowprotocol/wallet'

import { useIsTradeUnsupported } from 'legacy/state/lists/hooks'

import { isUnsupportedTokenInQuote } from 'modules/limitOrders/utils/isUnsupportedTokenInQuote'
import { useIsTokenPermittable } from 'modules/permit'
import { useDerivedTradeState } from 'modules/trade/hooks/useDerivedTradeState'
import { useIsWrapOrUnwrap } from 'modules/trade/hooks/useIsWrapOrUnwrap'
import { useTradeQuote } from 'modules/tradeQuote'

import { useTradeApproveState } from 'common/containers/TradeApprove'

import { TradeFormValidationCommonContext } from '../types'

export function useTradeFormValidationContext(): TradeFormValidationCommonContext | null {
  const { account } = useWalletInfo()
  const { state: derivedTradeState } = useDerivedTradeState()
  const tradeQuote = useTradeQuote()

  const { inputCurrency, outputCurrency, slippageAdjustedSellAmount, recipient, tradeType } = derivedTradeState || {}
  const approvalState = useTradeApproveState(slippageAdjustedSellAmount)
  const { address: recipientEnsAddress } = useENSAddress(recipient)
  const isSwapUnsupported =
    useIsTradeUnsupported(inputCurrency, outputCurrency) || isUnsupportedTokenInQuote(tradeQuote)

  const isBundlingSupported = useIsBundlingSupported()
  const isWrapUnwrap = useIsWrapOrUnwrap()
  const { isSupportedWallet } = useWalletDetails()
  const gnosisSafeInfo = useGnosisSafeInfo()

  const isSafeReadonlyUser = gnosisSafeInfo?.isReadOnly || false

  const isPermitSupported = !!useIsTokenPermittable(inputCurrency, tradeType)

  const commonContext = {
    account,
    isWrapUnwrap,
    isBundlingSupported,
    isSupportedWallet,
    isSwapUnsupported,
    isSafeReadonlyUser,
    recipientEnsAddress,
    approvalState,
    tradeQuote,
    isPermitSupported,
  }

  return useMemo(() => {
    if (!derivedTradeState) return null

    return {
      ...commonContext,
      derivedTradeState,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(commonContext), derivedTradeState])
}
