import type { Decorator } from 'final-form'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-focus'
import React, { ReactNode } from 'react'
import {
  FormRenderProps,
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps,
} from 'react-final-form'
import ErrorProvider from '../../providers/ErrorContext'
import { FormErrors, OnSubmitErrorFn, OnSubmitSucccessFn } from '../../types'

const focusOnErrors = createDecorator()

export type FormProps<FormValues = unknown> = {
  children?:
    | ((props: FormRenderProps<FormValues, Partial<FormValues>>) => ReactNode)
    | ReactNode
  errors: FormErrors
  onSubmit?: ReactFinalFormProps<FormValues, Partial<FormValues>>['onSubmit']
  onSubmitSuccess?: OnSubmitSucccessFn<FormValues>
  onSubmitError?: OnSubmitErrorFn
  initialValues?: Partial<FormValues>
  validateOnBlur?: ReactFinalFormProps<
    FormValues,
    Partial<FormValues>
  >['validateOnBlur']
  validate?: ReactFinalFormProps<FormValues, Partial<FormValues>>['validate']
  /**
   * The form name attribute
   */
  name?: string
  render?: ReactFinalFormProps<FormValues, Partial<FormValues>>['render']
  decorators?: ReactFinalFormProps<
    FormValues,
    Partial<FormValues>
  >['decorators']
  mutators?: ReactFinalFormProps<FormValues, Partial<FormValues>>['mutators']
  keepDirtyOnReinitialize?: boolean
}
const Form = <T,>({
  children,
  onSubmit,
  onSubmitError,
  onSubmitSuccess,
  errors,
  initialValues,
  validateOnBlur,
  validate,
  name,
  render,
  mutators,
  keepDirtyOnReinitialize,
}: FormProps<T>): JSX.Element => (
  <ErrorProvider errors={errors}>
    <ReactFinalForm
      initialValues={initialValues}
      validateOnBlur={validateOnBlur}
      validate={validate}
      decorators={[focusOnErrors as unknown as Decorator<T, Partial<T>>]}
      mutators={{
        ...arrayMutators,
        ...mutators,
      }}
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
      render={
        render ??
        (props => (
          <form noValidate name={name} onSubmit={props.handleSubmit}>
            {typeof children === 'function' ? children(props) : children}
          </form>
        ))
      }
      keepDirtyOnReinitialize={keepDirtyOnReinitialize}
    />
  </ErrorProvider>
)

export default Form
