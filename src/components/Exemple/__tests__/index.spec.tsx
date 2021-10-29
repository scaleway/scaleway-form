import React from 'react'
import Exemple from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Exemple', () => {
  test('renders correctly ', () => shouldMatchEmotionSnapshot(<Exemple />))
})
