import { Decorator, FORM_ERROR } from 'final-form'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-focus'
import { ReactNode } from 'react'
import {
  FormRenderProps,
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps,
} from 'react-final-form'
import { ErrorProvider } from '../../providers'
import { FormErrors, OnSubmitErrorFn, OnSubmitSucccessFn } from '../../types'

const focusOnErrors = createDecorator()

export type FormProps<FormValues = unknown> = {
  children?:
    | ((props: FormRenderProps<FormValues, Partial<FormValues>>) => ReactNode)
    | ReactNode
  errors: FormErrors
  /**
   * onRawSubmit is the base onSubmit from final-form
   */
  onRawSubmit?: ReactFinalFormProps<FormValues, Partial<FormValues>>['onSubmit']
  /**
   * onSubmit acts as onRawSubmit but will call onSubmitSuccess/Error lifecycles
   * and will parse eexception with parseSubmitException if provided
   * @deprecated its behavior is inconsistent, favor onRawSubmit
   */
  onSubmit?: ReactFinalFormProps<FormValues, Partial<FormValues>>['onSubmit']
  onSubmitSuccess?: OnSubmitSucccessFn<FormValues>
  onSubmitError?: OnSubmitErrorFn
  /**
   * parseSubmitException will be invoked on onSubmit throw
   * It will take the error and must return a readable string or undefined
   * @deprecated its behavior is inconsistent, favor onRawSubmit
   */
  parseSubmitException?: (error: unknown) => string | undefined
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
  mutators?: ReactFinalFormProps<FormValues, Partial<FormValues>>['mutators']
  keepDirtyOnReinitialize?: boolean
}

export const Form = <FormValues,>({
  children,
  onRawSubmit,
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
  parseSubmitException,
}: FormProps<FormValues>): JSX.Element => (
  <ReactFinalForm
    initialValues={initialValues}
    validateOnBlur={validateOnBlur}
    validate={validate}
    decorators={[
      focusOnErrors as unknown as Decorator<FormValues, Partial<FormValues>>,
    ]}
    mutators={{
      ...arrayMutators,
      ...mutators,
    }}
    onSubmit={async (values, form, callback) => {
      if (onRawSubmit) {
        return onRawSubmit(values, form, callback)
      }

      try {
        const res = await onSubmit?.(values, form, callback)
        if (res !== undefined) {
          await onSubmitError?.(res)
        } else {
          await onSubmitSuccess?.(values)
        }

        return res
      } catch (submitError) {
        await onSubmitError?.(submitError)

        return {
          [FORM_ERROR]: parseSubmitException
            ? parseSubmitException(submitError)
            : submitError,
        }
      }
    }}
    render={
      render ??
      (renderProps => (
        <ErrorProvider errors={errors}>
          <form noValidate name={name} onSubmit={renderProps.handleSubmit}>
            {typeof children === 'function' ? children(renderProps) : children}
          </form>
        </ErrorProvider>
      ))
    }
    keepDirtyOnReinitialize={keepDirtyOnReinitialize}
  />
)
