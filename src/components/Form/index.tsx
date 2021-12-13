import React, { ReactNode } from 'react'
import { FormRenderProps, Form as ReactFinalForm } from 'react-final-form'
import ErrorProvider from '../../providers/ErrorContext'
import {
  FormErrors,
  FormValidateFn,
  FormValues,
  OnSubmitErrorFn,
  OnSubmitFn,
  OnSubmitSucccessFn,
} from '../../types'

export type FormProps = {
  children: ((props: FormRenderProps) => ReactNode) | ReactNode
  errors: FormErrors
  onSubmit?: OnSubmitFn
  onSubmitSuccess?: OnSubmitSucccessFn
  onSubmitError?: OnSubmitErrorFn
  initialValues?: FormValues
  validateOnBlur?: boolean
  validate?: FormValidateFn
  /**
   * The form name attribute
   */
  name?: string
}
const Form = ({
  children,
  onSubmit,
  onSubmitError,
  onSubmitSuccess,
  errors,
  initialValues,
  validateOnBlur,
  validate,
  name,
}: FormProps): JSX.Element => (
  <ErrorProvider errors={errors}>
    <ReactFinalForm
      initialValues={initialValues}
      validateOnBlur={validateOnBlur}
      validate={validate}
      onSubmit={async (values: FormValues) => {
        try {
          const res = await onSubmit?.(values)
          if (res !== undefined) {
            await onSubmitError?.(res)
          } else {
            await onSubmitSuccess?.(values)
          }
        } catch (submitError) {
          await onSubmitError?.(submitError)
        }
      }}
      render={props => (
        <form noValidate name={name} onSubmit={props.handleSubmit}>
          {typeof children === 'function' ? children(props) : children}
        </form>
      )}
    />
  </ErrorProvider>
)

export default Form
