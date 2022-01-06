import { AnyObject } from 'final-form'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { FormErrorFunctionParams, FormErrors } from '../../types'

type ErrorContextValue = {
  errors: FormErrors
  getFirstError: <T = unknown>(
    params: FormErrorFunctionParams<T> & AnyObject,
  ) => string
}
const ErrorContext = createContext({} as ErrorContextValue)

type ErrorProviderProps = {
  children: ReactNode
  errors: FormErrors
}
const ErrorProvider = ({
  children,
  errors,
}: ErrorProviderProps): JSX.Element => {
  const getFirstError = useCallback(
    ({
      allValues,
      label,
      name,
      value,
      meta,
      ...additionalParams
    }: FormErrorFunctionParams & AnyObject) => {
      if (meta?.error && Array.isArray(meta.error)) {
        return (
          meta.error
            .map(untypedKey => {
              const key = untypedKey as keyof typeof errors
              if (typeof errors[key] === 'function') {
                return (errors[key] as (params: AnyObject) => string)({
                  allValues,
                  label,
                  meta,
                  name,
                  value,
                  ...additionalParams,
                })
              }

              return errors[key]
            })
            .filter(errorString => !!errorString)[0] ?? ''
        )
      }
      // With a custom validate function the user may return a string directly
      if (meta?.error && typeof meta?.error === 'string') return meta?.error

      return ''
    },
    [errors],
  )

  const value = useMemo(
    () =>
      ({
        errors,
        getFirstError,
      } as ErrorContextValue),
    [errors, getFirstError],
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export const useErrors = (): ErrorContextValue => useContext(ErrorContext)

export default ErrorProvider
