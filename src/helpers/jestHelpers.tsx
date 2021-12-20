import { ThemeProvider } from '@emotion/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import makeHelpers from '@scaleway/jest-helpers'
import { theme as scwuiTheme } from '@scaleway/ui'
import React, { FC } from 'react'

interface WrapperProps {
  theme?: typeof scwuiTheme
}

const Wrapper: FC<WrapperProps> = ({ theme = scwuiTheme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} = makeHelpers(Wrapper, { classNameReplacer: className => className })
