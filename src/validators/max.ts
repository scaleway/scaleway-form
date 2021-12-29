import { ValidatorFn } from './types'

const maxValidator: ValidatorFn<number> = max => {
  if (typeof max !== 'number') {
    throw new Error('max validator should receive a number')
  }

  return {
    error: 'TOO_HIGH',
    validate: value => Number(value) < max,
  }
}

export default maxValidator
