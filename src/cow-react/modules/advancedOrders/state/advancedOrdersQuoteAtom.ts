import { atom } from 'jotai'
import { OrderQuoteResponse } from '@cowprotocol/cow-sdk'
import GpQuoteError from '@cow/api/gnosisProtocol/errors/QuoteError'

export interface AdvancedOrdersQuoteState {
  response?: OrderQuoteResponse
  error?: GpQuoteError
}

export const advancedOrdersQuoteAtom = atom<AdvancedOrdersQuoteState>({})
