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
      if (meta?.error && errors[meta.error as keyof typeof errors]) {
        const key = meta.error as keyof typeof errors
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
      }

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
