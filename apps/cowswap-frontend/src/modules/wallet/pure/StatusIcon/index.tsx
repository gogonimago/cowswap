import styled from 'styled-components/macro'

import CoinbaseWalletIcon from '../../../../../../../libs/wallet/src/api/assets/coinbase.svg'
import WalletConnectIcon from '../../../../../../../libs/wallet/src/api/assets/walletConnectIcon.svg'
import { Identicon } from '../../../../../../../libs/wallet/src/api/container/Identicon'
import { ConnectionType } from '../../../../../../../libs/wallet/src/api/types'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

export interface StatusIconProps {
  connectionType: ConnectionType
}

export function StatusIcon({ connectionType }: StatusIconProps) {
  let image
  switch (connectionType) {
    case ConnectionType.INJECTED:
      image = <Identicon />
      break
    case ConnectionType.WALLET_CONNECT:
      image = <img src={WalletConnectIcon} alt="WalletConnect" />
      break
    case ConnectionType.COINBASE_WALLET:
      image = <img src={CoinbaseWalletIcon} alt="Coinbase Wallet" />
      break
  }

  return <IconWrapper size={16}>{image}</IconWrapper>
}
