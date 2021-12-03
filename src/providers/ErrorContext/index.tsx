import React, { ReactNode, createContext } from 'react'
import { FormErrors } from '../../types'

const ErrorContext = createContext({})

type ErrorProviderProps = {
  children: ReactNode
  errors: FormErrors
}
const ErrorProvider = ({
  children,
  errors,
}: ErrorProviderProps): JSX.Element => (
  <ErrorContext.Provider value={errors}>{children}</ErrorContext.Provider>
)

export default ErrorProvider
