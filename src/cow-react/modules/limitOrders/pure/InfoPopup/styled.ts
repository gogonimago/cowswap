import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import { X } from 'react-feather'

export const InfoPopup = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  line-height: 1.3;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${transparentize(0.88, theme.text1)} 0%, ${transparentize(0.94, theme.text1)} 100%)`};
  border-radius: 16px;
  padding: 20px 40px 16px 20px;

  > div > svg {
    width: 32px;
    height: 32px;

    > path {
      fill: ${({ theme }) => transparentize(0.5, theme.text1)};
    }
  }

  > div > a {
    color: ${({ theme }) => theme.text1};

    &::after {
      content: ' ↗';
      display: inline-block;
    }
  }
`

export const CloseIcon = styled(X)`
  position: absolute;
  right: 12px;
  top: 12px;
  stroke-width: 3;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`
