import { ValidatorObject } from '../types'

export type ValidatorFn<InputValue = unknown> = (
  args: InputValue,
) => ValidatorObject<InputValue>
