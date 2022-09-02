import { ValidatorFn } from './types'

const minLengthValidator: ValidatorFn<string, number> = minLength => ({
  error: 'MIN_LENGTH',
  validate: value => (value?.length ?? 0) >= minLength,
})

export default minLengthValidator
