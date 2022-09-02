import { AnyObject } from 'final-form'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useFormState } from 'react-final-form'
import { FormErrorFunctionParams, FormErrors } from '../../types'

type GetErrorProps = Omit<FormErrorFunctionParams, 'allValues'> &
  AnyObject & { errorProp?: string; additionalErrorChecks?: boolean }

type ErrorContextValue = {
  errors: FormErrors
  getError: (props: GetErrorProps) => string | undefined
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
  const { values } = useFormState()

  const getFirstError = useCallback(
    ({
      label,
      name,
      value,
      meta,
      ...additionalParams
    }: Omit<FormErrorFunctionParams, 'allValues'> & AnyObject) => {
      if (meta?.error && Array.isArray(meta.error)) {
        return (
          meta.error
            .map(untypedKey => {
              const key = untypedKey as keyof typeof errors
              if (typeof errors[key] === 'function') {
                return (errors[key] as (params: AnyObject) => string)({
                  label,
                  meta,
                  name,
                  value,
                  values,
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
    [errors, values],
  )

  const getError = useCallback(
    ({ meta, errorProp, value, ...props }: GetErrorProps) => {
      if (errorProp) return errorProp

      const hasInitialValueAndNotTouched =
        value !== undefined &&
        value !== null &&
        value !== '' &&
        meta?.dirty === false

      return meta?.error && (hasInitialValueAndNotTouched || meta.touched)
        ? getFirstError({ meta, value, ...props })
        : undefined
    },
    [getFirstError],
  )

  const value = useMemo(
    () =>
      ({
        errors,
        getError,
      } as ErrorContextValue),
    [errors, getError],
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export const useErrors = (): ErrorContextValue => useContext(ErrorContext)

export default ErrorProvider
