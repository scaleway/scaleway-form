import {
  AnyObject,
  FieldSubscription,
  FieldValidator,
  ValidationErrors,
} from 'final-form'

export type AnyValue = unknown

export type FormValues = AnyObject

/**
 * Return undefined if all is ok
 */
export type OnSubmitFn = (
  values: FormValues,
) => Promise<undefined | unknown> | (undefined | void)

export type OnSubmitSucccessFn = (values: FormValues) => Promise<void> | void
export type OnSubmitErrorFn = (error: Error | unknown) => Promise<void> | void

/**
 * Return {} or undefined when form is valid
 */
export type FormValidateFn = (
  values: FormValues,
) => ValidationErrors | Promise<ValidationErrors>

export type FormErrorFunctionParams = {
  label: string
  name: string
  value: string
  allValues: FormValues
}

type RequiredErrors = {
  TOO_LOW:
    | ((params: FormErrorFunctionParams & { min: string }) => string)
    | string
  REQUIRED: ((params: FormErrorFunctionParams) => string) | string
}

type AdditionalErrors = {
  [x: string]:
    | ((params: FormErrorFunctionParams & { [x: string]: unknown }) => string)
    | string
}

export type FormErrors = RequiredErrors & AdditionalErrors

export type ParseFn<FieldValue, InputValue = AnyValue> = (
  value: InputValue,
  name: string,
) => FieldValue

export type FormatFn<FieldValue, InputValue = AnyValue> = (
  value: FieldValue,
  name: string,
) => InputValue

export type BaseFieldProps<FieldValue, InputValue = AnyValue> = {
  parse?: ParseFn<FieldValue, InputValue>
  format?: FormatFn<FieldValue, InputValue>
  formatOnBlur?: boolean
  subscription?: FieldSubscription
  validateFields?: string[]
  defaultValue?: FieldValue
  data?: AnyObject
  allowNull?: boolean
  initialValue?: FieldValue
  multiple?: boolean
  isEqual?: (a: InputValue, b: InputValue) => boolean
  validate?: FieldValidator<FieldValue>
  afterSubmit?: () => void
  beforeSubmit?: () => void | boolean
  value?: FieldValue
}
