import { ValidatorFn } from './types'

const minValidator: ValidatorFn<number> = min => ({
  error: 'TOO_LOW',
  validate: value => Number(value) > min,
})

export default minValidator
