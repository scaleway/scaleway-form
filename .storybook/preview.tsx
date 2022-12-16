import { SCWUITheme, normalize, theme } from '@scaleway/ui'

import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import { Story } from '@storybook/react'

const STORY_SORT = {
  order: [
    'Introduction',
    'Components',
    ['Form', 'Fields', 'SubmitErrorAlert', 'Submit'],
  ],
}

const ENV_PARAMETERS = {
  development: {
    actions: { disable: true, argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      source: { excludeDecorators: true },
    },
  },
  production: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      source: { excludeDecorators: true },
    },
  },
}
export const parameters =
  (process.env?.['STORYBOOK_ENVIRONMENT'] as keyof typeof ENV_PARAMETERS) ||
  ENV_PARAMETERS.production

const adjustedTheme = (ancestorTheme: Theme) =>
  ({
    ...ancestorTheme,
    ...Object.keys(theme).reduce(
      (acc, themeItem) => ({
        ...acc,
        [themeItem]: {
          ...((acc[themeItem as keyof typeof theme] as Record<
            string,
            unknown
          >) ?? {}),
          ...(theme[themeItem as keyof typeof theme] as Record<
            string,
            unknown
          >),
        },
      }),
      ancestorTheme,
    ),
  } as SCWUITheme)

export const globalStyles = (_: Theme) => css`
  ${normalize()}
`

export const decorators = [
  (StoryComponent: Story) => (
    <ThemeProvider theme={adjustedTheme}>
      <Global styles={[globalStyles]} />
      <StoryComponent />
    </ThemeProvider>
  ),
]
