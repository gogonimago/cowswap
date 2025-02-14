import { createAction } from '@reduxjs/toolkit'

import { WithChainId } from '../lists/actions'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
// export const updateVersion = createAction('global/updateVersion')
// takes chainId prop to properly set up lists, always defaults to constants/index::DEFAULT_NETWORK_FOR_LISTS
export const updateVersion = createAction<WithChainId>('global/updateVersion')
