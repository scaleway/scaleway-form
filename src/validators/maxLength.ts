import { ValidatorFn } from './types'

const maxLengthValidator: ValidatorFn<string, number> = maxLength => ({
  error: 'MAX_LENGTH',
  validate: value => (value?.length ?? 0) <= maxLength,
})

export default maxLengthValidator
