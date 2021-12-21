import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import { theme as scwuiTheme } from '@scaleway/ui'
import { RenderResult } from '@testing-library/react'
import React, { FC, ReactNode } from 'react'
import Form from '../components/Form'
import mockErrors from '../mocks/mockErrors'

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

export const shouldMatchEmotionSnapshotFormWrapper = (
  children: ReactNode,
  options?: {
    transform: (node: RenderResult) => Promise<void> | void
  },
) =>
  shouldMatchEmotionSnapshot(
    <Form errors={mockErrors}>{() => children}</Form>,
    options,
  )
