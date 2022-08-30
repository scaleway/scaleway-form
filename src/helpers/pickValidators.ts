import { ValidatorObject, ValidatorProps } from '../types'
import validators from '../validators'
import { ValidatorFn } from '../validators/types'

const pickValidators = <InputValue = unknown>(args: ValidatorProps) =>
  Object.entries(args)
    .map(([key, value]) =>
      value === undefined || (key === 'required' && value === false)
        ? undefined
        : (validators as Record<string, ValidatorFn>)[
            key as keyof typeof validators
          ]?.(value),
    )
    .filter(validator => !!validator) as ValidatorObject<InputValue>[]

export default pickValidators
