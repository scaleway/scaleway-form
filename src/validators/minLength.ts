import { ValidatorFn } from './types'

const minLengthValidator: ValidatorFn<string, number> = minLength => ({
  error: 'MIN_LENGTH',
  validate: value => value?.length > minLength,
})

export default minLengthValidator
