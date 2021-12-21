import { AnyObject, FieldState, FieldValidator } from 'final-form'
import { useCallback } from 'react'
import { ValidatorObject } from '../types'

type UseValidationParams<FieldValue = unknown> = {
  validators: ValidatorObject<FieldValue>[]
  validate?: FieldValidator<FieldValue>
}

type UseValidationResult<FieldValue = unknown> = (
  value: FieldValue,
  allValues: AnyObject,
  meta?: FieldState<FieldValue>,
) => Array<string> | undefined | unknown

const useValidation = <T = unknown>({
  validators,
  validate,
}: UseValidationParams<T>): UseValidationResult<T> => {
  const fn = useCallback(
    (
      value: T,
      allValues: AnyObject,
      meta?: FieldState<T>,
    ): Array<string | unknown> | undefined => {
      const errors = (validators ?? [])
        .filter(validator => !validator.validate(value, allValues, meta))
        .map(({ error }) => error) as Array<string | unknown>

      if (validate) {
        const validateErr = validate(value, allValues, meta) as
          | unknown
          | undefined
        if (validateErr) errors.push(validateErr)
      }

      return errors.length > 0 ? errors : undefined
    },
    [validators, validate],
  )

  return fn
}

export default useValidation
