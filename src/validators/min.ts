import { ValidatorFn } from './types'

const minValidator: ValidatorFn<number> = min => {
  if (typeof min !== 'number') {
    throw new Error('min validator should receive a number')
  }

  return {
    error: 'TOO_LOW',
    validate: value => Number(value) > min,
  }
}

export default minValidator
