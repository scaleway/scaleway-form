import { renderHook } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { Form } from '../../components'
import { mockErrors } from '../../mocks'
import { useField } from '../useField'

describe('useField', () => {
  test('should render correctly', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <Form errors={mockErrors}>{children}</Form>
    )
    const { result } = renderHook(() => useField('fieldName', {}), { wrapper })
    expect(result.current).toBeDefined()
  })
})
