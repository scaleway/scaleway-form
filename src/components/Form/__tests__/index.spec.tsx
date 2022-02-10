import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Form from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'

describe('Form', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(<Form errors={mockErrors}>{() => 'Test'}</Form>))
  test('renders correctly with node children', () =>
    shouldMatchEmotionSnapshot(<Form errors={mockErrors}>Test</Form>))

  test('renders correctly with validate', () =>
    shouldMatchEmotionSnapshot(
      <Form errors={mockErrors} validate={() => ({ test: 'test' })}>
        {() => 'Test'}
      </Form>,
    ))

  test('renders correctly with onSubmit that return undefined', () => {
    const onSubmit = jest.fn(() => undefined)
    const onSubmitSuccess = jest.fn(() => {})
    const onSubmitError = jest.fn(() => {})

    return shouldMatchEmotionSnapshot(
      <Form
        errors={mockErrors}
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
      >
        {() => <button type="submit">Submit</button>}
      </Form>,
      {
        transform: async ({ getByText }) => {
          userEvent.click(getByText('Submit'))
          expect(onSubmit).toBeCalledTimes(1)
          await waitFor(() => expect(onSubmitSuccess).toBeCalledTimes(1))
          expect(onSubmitError).toBeCalledTimes(0)
        },
      },
    )
  })

  test('renders correctly with onSubmit that return {}', () => {
    const onSubmit = jest.fn(() => Promise.resolve({}))
    const onSubmitSuccess = jest.fn(() => {})
    const onSubmitError = jest.fn(() => {})

    return shouldMatchEmotionSnapshot(
      <Form
        errors={mockErrors}
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
      >
        {() => <button type="submit">Submit</button>}
      </Form>,
      {
        transform: async ({ getByText }) => {
          userEvent.click(getByText('Submit'))
          expect(onSubmit).toBeCalledTimes(1)
          await waitFor(() => expect(onSubmitError).toBeCalledTimes(1))
          expect(onSubmitSuccess).toBeCalledTimes(0)
        },
      },
    )
  })

  test('renders correctly with onSubmit that throw', () => {
    const onSubmit = jest.fn(() => Promise.reject())
    const onSubmitSuccess = jest.fn(() => {})
    const onSubmitError = jest.fn(() => {})

    return shouldMatchEmotionSnapshot(
      <Form
        errors={mockErrors}
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
      >
        {() => <button type="submit">Submit</button>}
      </Form>,
      {
        transform: async ({ getByText }) => {
          userEvent.click(getByText('Submit'))
          expect(onSubmit).toBeCalledTimes(1)
          await waitFor(() => expect(onSubmitError).toBeCalledTimes(1))
          expect(onSubmitSuccess).toBeCalledTimes(0)
        },
      },
    )
  })
})
