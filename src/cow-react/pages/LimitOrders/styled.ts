import styled from 'styled-components/macro'

export const PageWrapper = styled.div`
  width: 100%;
  display: grid;
  max-width: ${({ theme }) => theme.appBody.maxWidth.limit};
  margin: 0 auto;
  grid-template-columns: ${({ theme }) => theme.appBody.maxWidth.swap} 1fr;
  grid-column-gap: 20px;

  ${({ theme }) => theme.mediaWidth.upToLarge``}
  ${({ theme }) => theme.mediaWidth.upToMedium``};
`

// Form + banner
export const PrimaryWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`

// Graph + orders table
export const SecondaryWrapper = styled.div`
  display: flex;
`
