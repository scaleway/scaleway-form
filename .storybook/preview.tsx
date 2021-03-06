import { SCWUITheme, normalize, lightTheme } from '@scaleway/ui'
import React from 'react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'

const STORY_SORT = {
  order: ['Introduction', 'Components', 'Labs'],
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
    viewMode: 'canvas',
    previewTabs: {
      'storybook/docs/panel': { index: 1 },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
  },
  production: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
  },
}
export const parameters =
  ENV_PARAMETERS[process.env.STORYBOOK_ENVIRONMENT] || ENV_PARAMETERS.production

const adjustedTheme = ancestorTheme =>
  ({
    ...ancestorTheme,
    ...Object.keys(lightTheme).reduce(
      (acc, themeItem) => ({
        ...acc,
        [themeItem]: {
          ...(acc[themeItem] ?? {}),
          ...lightTheme[themeItem],
        },
      }),
      ancestorTheme,
    ),
  } as SCWUITheme)

export const globalStyles = (theme: Theme) => css`
  ${normalize()}

  body {
    font-family: ${theme.fonts.sansSerif};
  }
`

export const decorators = [
  Story => (
    <ThemeProvider theme={adjustedTheme}>
      <Global styles={[globalStyles]} />
      <Story />
    </ThemeProvider>
  ),
]
