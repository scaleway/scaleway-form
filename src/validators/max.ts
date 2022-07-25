import { ValidatorFn } from './types'

const maxValidator: ValidatorFn<number> = max => ({
  error: 'TOO_HIGH',
  validate: value => Number(value) <= max,
})

export default maxValidator
