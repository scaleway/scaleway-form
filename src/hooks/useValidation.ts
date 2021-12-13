import { AnyObject } from 'final-form'
import { useCallback } from 'react'
import { AnyValue, ValidatorObject } from '../types'

type UseValidationResult = (
  value: AnyValue,
  allValues: AnyObject,
) => Array<string>

const useValidation = (
  arrayOfValidator: ValidatorObject[],
): UseValidationResult => {
  const fn = useCallback(
    (value: AnyValue, allValues: AnyObject): Array<string> =>
      arrayOfValidator
        .filter(validator => !validator.validate(value, allValues))
        .map(({ error }) => error),
    [arrayOfValidator],
  )

  return fn
}

export default useValidation
