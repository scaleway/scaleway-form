import { AnyObject } from 'final-form'
import { useCallback } from 'react'
import { ValidatorObject } from '../types'

type UseValidationResult = (
  value: unknown,
  allValues: AnyObject,
) => Array<string>

const useValidation = (
  arrayOfValidator: ValidatorObject[],
): UseValidationResult => {
  const fn = useCallback(
    (value: unknown, allValues: AnyObject): Array<string> =>
      arrayOfValidator
        .filter(validator => !validator.validate(value, allValues))
        .map(({ error }) => error),
    [arrayOfValidator],
  )

  return fn
}

export default useValidation
