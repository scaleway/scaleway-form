import { ValidatorFn } from './types'

const validator: ValidatorFn<string, RegExp[]> = regexes => ({
  error: 'REGEX',
  validate: value => regexes.every(regex => regex.test(value)),
})

export default validator
