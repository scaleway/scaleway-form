import * as SCWRegex from '@scaleway/regex'
import { ValidatorFn } from './types'

const validator: ValidatorFn<string, keyof typeof SCWRegex> = regex => {
  if (!Object.keys(SCWRegex).includes(regex)) {
    throw new Error(
      `regex should be one of these : ${Object.keys(SCWRegex).join(', ')}`,
    )
  }

  return {
    error: 'REGEX',
    validate: value => SCWRegex[regex].test(value),
  }
}

export default validator
