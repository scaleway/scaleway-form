import { AnyValue, ValidatorObject } from '../types'

export type ValidatorFn<InputValue = AnyValue> = (
  args: InputValue,
) => ValidatorObject<InputValue>
