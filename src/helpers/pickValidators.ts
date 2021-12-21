import { ValidatorProps } from '../types'
import validators from '../validators'
import { ValidatorFn } from '../validators/types'

const pickValidators = (args: ValidatorProps) =>
  Object.entries(args)
    .map(([key, value]) =>
      (validators as Record<string, ValidatorFn>)[
        key as keyof typeof validators
      ]?.(value),
    )
    .filter(validator => !!validator)

export default pickValidators
