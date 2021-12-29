import { ValidatorFn } from './types'

const minLengthValidator: ValidatorFn<string, number> = minLength => {
  if (typeof minLength !== 'number') {
    throw new Error('min length validator should receive a number')
  }

  return {
    error: 'MIN_LENGTH',
    validate: value => value?.length > minLength,
  }
}

export default minLengthValidator
