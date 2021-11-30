import { ValidationErrors } from 'final-form'

export type FormValues = Record<string, unknown>

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
