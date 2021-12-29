import { ValidatorObject, ValidatorProps } from '../types'
import validators from '../validators'
import { ValidatorFn } from '../validators/types'

const pickValidators = (args: ValidatorProps) =>
  Object.entries(args)
    .map(([key, value]) =>
      value !== undefined
        ? (validators as Record<string, ValidatorFn>)[
            key as keyof typeof validators
          ]?.(value)
        : undefined,
    )
    .filter(validator => !!validator) as ValidatorObject[]

export default pickValidators
