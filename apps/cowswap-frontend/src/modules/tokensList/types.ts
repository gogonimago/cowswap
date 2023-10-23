import { Token } from '@uniswap/sdk-core'
import { TokenInfo } from '@uniswap/token-lists'

export class TokenWithLogo extends Token {
  static fromToken(token: Token | TokenInfo, logoURI?: string): TokenWithLogo {
    return new TokenWithLogo(logoURI, token.chainId, token.address, token.decimals, token.symbol, token.name)
  }

  constructor(
    public logoURI: string | undefined, // <--- this is the only difference
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    bypassChecksum?: boolean
  ) {
    super(chainId, address, decimals, symbol, name, bypassChecksum)
  }
}

export interface TokenList {
  id: string
  name: string
  logoUrl: string
  url: string
  enabled: boolean
  tokensCount: number
  version: string
}
