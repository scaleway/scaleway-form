import { LabeledRegex } from '../types'
import { ValidatorFn } from './types'

const validator: ValidatorFn<
  string,
  (LabeledRegex | LabeledRegex[])[]
> = regexes => ({
  error: 'REGEX',
  validate: value =>
    regexes.every(regex =>
      Array.isArray(regex)
        ? regex.some(regexOr => regexOr.value.test(value))
        : regex.value.test(value),
    ),
})

export default validator
