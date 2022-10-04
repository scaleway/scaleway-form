import { SCWUITheme, normalize, lightTheme } from '@scaleway/ui'

import { css, ThemeProvider, Global, Theme } from '@emotion/react'

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
`

export const decorators = [
  Story => (
    <ThemeProvider theme={adjustedTheme}>
      <Global styles={[globalStyles]} />
      <Story />
    </ThemeProvider>
  ),
]
