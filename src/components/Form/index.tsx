import { Config } from 'final-form'
import React, { ReactNode } from 'react'
import { FormRenderProps, Form as ReactFinalForm } from 'react-final-form'
import ErrorProvider from '../../providers/ErrorContext'
import { FormErrors, OnSubmitErrorFn, OnSubmitSucccessFn } from '../../types'

export type FormProps<FormValues = unknown> = {
  children:
    | ((props: FormRenderProps<FormValues, Partial<FormValues>>) => ReactNode)
    | ReactNode
  errors: FormErrors
  onSubmit?: Config<FormValues, Partial<FormValues>>['onSubmit']
  onSubmitSuccess?: OnSubmitSucccessFn<FormValues>
  onSubmitError?: OnSubmitErrorFn
  initialValues?: Partial<FormValues>
  validateOnBlur?: Config<FormValues, Partial<FormValues>>['validateOnBlur']
  validate?: Config<FormValues, Partial<FormValues>>['validate']
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
      onSubmit={async (values, form, callback) => {
        try {
          const res = await onSubmit?.(values, form, callback)
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
