import userEvent from '@testing-library/user-event'
import React from 'react'
import Submit from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

describe('Submit', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <Form errors={mockErrors}>{() => <Submit>Test</Submit>}</Form>,
    ))

  test('form is invalid', () =>
    shouldMatchEmotionSnapshot(
      <Form validate={() => ({ test: 'test' })} errors={mockErrors}>
        <Submit>Test</Submit>
      </Form>,
    ))

  test('form is submitting', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)

    await shouldMatchEmotionSnapshot(
      <Form
        onSubmit={() =>
          new Promise(resolve => {
            setTimeout(() => resolve(undefined), 5000)
          })
        }
        errors={mockErrors}
      >
        <Submit>Test</Submit>
      </Form>,
      {
        transform: ({ getByText }) => {
          userEvent.click(
            getByText('Test').closest('button') as HTMLButtonElement,
          )
          expect(
            getByText('Test').closest('button') as HTMLButtonElement,
          ).toBeDisabled()
        },
      },
    )

    jest.spyOn(global.Math, 'random').mockRestore()
  })
})
