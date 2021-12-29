import { ValidatorFn } from './types'

const maxLengthValidator: ValidatorFn<string, number> = maxLength => {
  if (typeof maxLength !== 'number') {
    throw new Error('max length validator should receive a number')
  }

  return {
    error: 'MAX_LENGTH',
    validate: value => value?.length < maxLength,
  }
}

export default maxLengthValidator
