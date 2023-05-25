import { useMemo } from 'react'
import { Field } from 'legacy/state/swap/actions'
import { useQuote } from 'modules/tradeQuote'
import { useDerivedTradeState } from 'modules/trade/hooks/useDerivedTradeState'
import { useUpdateCurrencyAmount } from 'modules/trade/hooks/useUpdateCurrencyAmount'

export function useQuoteObserver() {
  const { state } = useDerivedTradeState()
  const { response } = useQuote()

  const updateCurrencyAmount = useUpdateCurrencyAmount()
  const outputCurrency = state?.outputCurrency

  useMemo(() => {
    if (!outputCurrency || !response) {
      return
    }

    const value = response.quote.buyAmount

    updateCurrencyAmount({
      amount: { isTyped: false, value },
      currency: outputCurrency,
      field: Field.OUTPUT,
    })
  }, [outputCurrency, response, updateCurrencyAmount])
}
