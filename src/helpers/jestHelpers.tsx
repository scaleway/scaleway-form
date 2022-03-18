import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import { lightTheme } from '@scaleway/ui'
import { render } from '@testing-library/react'
import React, { FC, ReactElement, ReactNode } from 'react'
import Form from '../components/Form'
import mockErrors from '../mocks/mockErrors'

interface WrapperProps {
  theme?: typeof lightTheme
}

const Wrapper: FC<WrapperProps> = ({ theme = lightTheme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} = makeHelpers(Wrapper, { classNameReplacer: className => className })

export const shouldMatchEmotionSnapshotFormWrapper = (
  children: ReactNode,
  options?: Parameters<typeof shouldMatchEmotionSnapshot>[1],
) =>
  shouldMatchEmotionSnapshot(
    <Form errors={mockErrors}>{() => children}</Form>,
    options,
  )

export const renderWithWrapper = (children: ReactElement) =>
  render(children, {
    wrapper: () => (
      <ThemeProvider theme={lightTheme}>
        <Form errors={mockErrors}>{children}</Form>
      </ThemeProvider>
    ),
  })

export const mockRandom = () =>
  jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)

export const restoreRandom = () =>
  jest.spyOn(global.Math, 'random').mockRestore()
