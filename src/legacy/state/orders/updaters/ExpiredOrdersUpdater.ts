import { useCallback, useRef } from 'react'

import { EXPIRED_ORDERS_PENDING_TIME } from 'legacy/constants'
import { SetIsOrderRefundedBatch } from 'legacy/state/orders/actions'
import { EXPIRED_ORDERS_CHECK_POLL_INTERVAL } from 'legacy/state/orders/consts'
import { useExpiredOrders, useSetIsOrderRefundedBatch } from 'legacy/state/orders/hooks'

import { useWalletInfo } from 'modules/wallet'

import { getOrder } from 'api/gnosisProtocol'
import { usePolling } from 'common/hooks/usePolling'

export function ExpiredOrdersUpdater(): null {
  const { chainId, account } = useWalletInfo()
  const expired = useExpiredOrders({ chainId })

  // Ref, so we don't rerun useEffect
  const expiredRef = useRef(expired)
  const isUpdating = useRef(false) // TODO: Implement using SWR or retry/cancellable promises
  expiredRef.current = expired

  const setIsOrderRefundedBatch = useSetIsOrderRefundedBatch()

  const updateOrders = useCallback(async () => {
    if (!chainId || !account || isUpdating.current) {
      return
    }

    const lowerCaseAccount = account.toLowerCase()
    const now = Date.now()

    try {
      isUpdating.current = true

      // Filter orders:
      // - Owned by the current connected account
      // - Created in the last 5 min, no further
      // - Not yet refunded
      const pending = expiredRef.current.filter(({ owner, creationTime: creationTimeString, refundHash }) => {
        const creationTime = new Date(creationTimeString).getTime()

        return (
          owner.toLowerCase() === lowerCaseAccount && now - creationTime < EXPIRED_ORDERS_PENDING_TIME && !refundHash
        )
      })

      if (pending.length === 0) {
        // console.debug(`[CancelledOrdersUpdater] No orders are being expired`)
        return
      } else {
        console.debug(`[ExpiredOrdersUpdater] Checking ${pending.length} recently expired orders...`)
      }

      const ordersPromises = pending.map(({ id }) => getOrder(chainId, id))

      const resolvedPromises = await Promise.allSettled(ordersPromises)

      const items: SetIsOrderRefundedBatch['items'] = []

      resolvedPromises.forEach((promise) => {
        if (promise.status === 'fulfilled' && promise.value?.ethflowData?.refundTxHash) {
          items.push({ id: promise.value.uid, refundHash: promise.value?.ethflowData?.refundTxHash })
        }
      })

      items.length && setIsOrderRefundedBatch({ chainId, items })

      console.debug(`[ExpiredOrdersUpdater] ${items.length} orders have been refunded`, items)
    } finally {
      isUpdating.current = false
    }
  }, [setIsOrderRefundedBatch, account, chainId])

  usePolling({
    callback: updateOrders,
    name: 'ExpiredOrdersUpdater',
    pollingFrequency: EXPIRED_ORDERS_CHECK_POLL_INTERVAL,
    triggerEagerly: true,
  })

  return null
}
