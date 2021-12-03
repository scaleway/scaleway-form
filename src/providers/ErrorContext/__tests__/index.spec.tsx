import React from 'react'
import ErrorProvider from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'

describe('ErrorProvider', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <ErrorProvider errors={mockErrors}>Test</ErrorProvider>,
    ))
})
