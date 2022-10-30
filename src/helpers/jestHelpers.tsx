import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import { theme as lightTheme } from '@scaleway/ui'
import { render } from '@testing-library/react'
import { ComponentProps, ReactElement, ReactNode } from 'react'
import { Form } from '../components'
import { mockErrors } from '../mocks'

interface WrapperProps {
  theme?: typeof lightTheme
  children: ReactNode
}

const Wrapper = ({ theme = lightTheme, children }: WrapperProps) => (
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
  formOptions?: Partial<ComponentProps<typeof Form>>,
) => {
  const { initialValues } = formOptions ?? {}

  return shouldMatchEmotionSnapshot(
    <Form errors={mockErrors} initialValues={initialValues}>
      {() => children}
    </Form>,
    options,
  )
}

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
