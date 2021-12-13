import { AnyObject } from 'final-form'
import { useCallback } from 'react'
import { AnyValue } from '../types'

type Validator = {
  validate: (value: AnyValue, allValues: AnyObject) => boolean
  error: 'TOO_LOW' | 'REQUIRED'
}

const useValidation = (arrayOfValidator: Validator[]) => {
  const fn = useCallback(
    (value: AnyValue, allValues: AnyObject): Array<string> =>
      arrayOfValidator
        .filter(validator => validator.validate(value, allValues))
        .map(({ error }) => error),
    [arrayOfValidator],
  )

  return fn
}

export default useValidation
