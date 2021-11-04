import React from 'react'
import Example from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Example', () => {
  test('renders correctly ', () => shouldMatchEmotionSnapshot(<Example />))
})
