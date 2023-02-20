import { Trans } from '@lingui/macro'
import styled, { css } from 'styled-components/macro'
import CowProtocolLogo from 'components/CowProtocolLogo'
import { useCombinedBalance } from 'state/cowToken/hooks'
import { ChainId } from 'state/lists/actions/actionsMod'
import { formatMax, formatSmartLocaleAware } from '@cow/utils/format'
import { COW } from 'constants/tokens'
import { transparentize } from 'polished'
import { useWeb3React } from '@cow/common/hooks/useWeb3React'
import { supportedChainId } from 'utils/supportedChainId'

export const Wrapper = styled.div<{ isLoading: boolean }>`
  background-color: transparent;
  color: ${({ theme }) => theme.text1};
  padding: 6px 12px;
  border: 2px solid transparent;
  font-weight: 500;
  width: auto;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 21px;
  pointer-events: auto;
  transition: width 0.2s ease-in-out, border 0.2s ease-in-out;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    height: 100%;
    width: auto;
    padding: 6px 12px 6px 8px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6px 8px;
  `};

  &:hover {
    border: 2px solid ${({ theme }) => transparentize(0.7, theme.text1)};
  }

  ${({ theme, isLoading }) =>
    isLoading &&
    css`
      overflow: hidden;
      &::before {
        z-index: -1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        ${theme.shimmer}; // shimmer effect
        content: '';
      }
    `}

  > b {
    margin: 0 0 0 5px;
    font-weight: inherit;
    white-space: nowrap;

    ${({ theme }) => theme.mediaWidth.upToMedium`
      overflow: hidden;
      max-width: 100px;
      text-overflow: ellipsis;
    `};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      overflow: visible;
      max-width: initial;
    `};
  }
`

interface CowBalanceButtonProps {
  account?: string | null | undefined
  chainId: ChainId | undefined
  onClick?: () => void
  isUpToSmall?: boolean
}

const COW_DECIMALS = COW[ChainId.MAINNET].decimals

export default function CowBalanceButton({ onClick, isUpToSmall }: CowBalanceButtonProps) {
  const { chainId } = useWeb3React()
  const { balance, isLoading } = useCombinedBalance()

  const formattedBalance = formatSmartLocaleAware(balance, 0)
  const formattedMaxBalance = formatMax(balance, COW_DECIMALS)

  if (!supportedChainId(chainId)) {
    return null
  }

  return (
    <Wrapper isLoading={isLoading} onClick={onClick}>
      <CowProtocolLogo />
      {!isUpToSmall && (
        <b title={formattedMaxBalance && `${formattedMaxBalance} (v)COW`}>
          <Trans>{formattedBalance || 0}</Trans>
        </b>
      )}
    </Wrapper>
  )
}
