import { useMemo } from 'react'
import { UseFieldConfig, useField as useFinalFormField } from 'react-final-form'
import { pickValidators } from '../helpers'
import { ValidatorProps } from '../types'
import { useValidation } from './useValidation'

export const useField = <
  FieldValue = unknown,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue,
>(
  name: string,
  {
    afterSubmit,
    allowNull,
    beforeSubmit,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    value,
    max,
    maxLength,
    min,
    minLength,
    regex,
    required,
    maxDate,
    minDate,
  }: UseFieldConfig<FieldValue, InputValue> & ValidatorProps,
) => {
  const validators = useMemo(
    () =>
      pickValidators<FieldValue>({
        max,
        maxDate,
        maxLength,
        min,
        minDate,
        minLength,
        regex,
        required,
      }),
    [max, maxLength, min, minLength, regex, required, maxDate, minDate],
  )

  const validateFn = useValidation({ validate, validators })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => ({ key: Math.random() }), [validateFn])

  return useFinalFormField<FieldValue, T, InputValue>(name, {
    afterSubmit,
    allowNull,
    beforeSubmit,
    data,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate: validateFn,
    validateFields,
    value,
  })
}
