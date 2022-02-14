import { TextBox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { Ref, forwardRef, useMemo } from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type TextBoxFieldProps<T = unknown, K = string> = BaseFieldProps<
  T,
  K
> & {
  label?: string
  name: string
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  regex?: (RegExp | RegExp[])[]
  readOnly?: boolean
  disabled?: boolean
  id?: string
  rows?: number
  cols?: number
  autoComplete?: string
  autoCorrect?: string
  autoCapitalize?: string
  autoFocus?: boolean
  multiline?: boolean
  autoSave?: string
  type?: string
  className?: string
}

const TextBoxField = forwardRef(
  (
    {
      validate,
      label = '',
      name,
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
      placeholder,
      subscription,
      validateFields,
      value,
      max,
      maxLength,
      min,
      minLength,
      regex,
      disabled,
      required,
      readOnly,
      id,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      cols,
      rows,
      autoFocus,
      autoSave,
      multiline,
      type,
      className,
    }: TextBoxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { values } = useFormState()
    const { getFirstError } = useErrors()

    const validateFn = useValidation({
      validate,
      validators: pickValidators({
        max,
        maxLength,
        min,
        minLength,
        regex,
        required,
      }),
    })

    const { input, meta } = useField(name, {
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

    const error = useMemo(
      () =>
        meta.error && meta.touched
          ? getFirstError<string>({
              allValues: values,
              label,
              max,
              maxLength,
              meta: meta as FieldState<string>,
              min,
              minLength,
              name,
              regex,
              value: input.value,
            })
          : undefined,
      [
        getFirstError,
        input.value,
        label,
        max,
        maxLength,
        meta,
        min,
        minLength,
        name,
        regex,
        values,
      ],
    )

    return (
      <TextBox
        name={input.name}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        type={input.type}
        value={input.value}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        required={required}
        readOnly={readOnly}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        autoSave={autoSave}
        multiline={multiline}
        cols={cols}
        rows={rows}
        id={id}
        error={error}
        ref={ref}
        className={className}
      />
    )
  },
)

export default TextBoxField
