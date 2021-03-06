import { DateInput } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps, useMemo } from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type DateFieldProps = BaseFieldProps<Date> &
  Omit<
    ComponentProps<typeof DateInput>,
    | 'maxDate'
    | 'minDate'
    | 'disabled'
    | 'required'
    | 'locale'
    | 'name'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'autoFocus'
  > & {
    name: string
    maxDate?: Date
    minDate?: Date
    disabled?: boolean
    required?: boolean
    locale?: string
    onChange?: (value: string | Date | undefined) => void
    onBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void
    onFocus?: (value: React.FocusEvent<HTMLElement, Element>) => void
  }

const parseDate = (value: Date | string): Date =>
  typeof value === 'string' ? new Date(value) : value

const isEmpty = (value?: Date | string): boolean =>
  typeof value === 'string' ? value === '' : value === undefined

const DateField = ({
  required,
  name,
  label = '',
  validate,
  format,
  locale,
  maxDate,
  minDate,
  initialValue,
  disabled,
  value: inputVal,
  onChange,
  onBlur,
  onFocus,
  formatOnBlur,
}: DateFieldProps) => {
  const { values } = useFormState()
  const { getFirstError } = useErrors()
  const validateFn = useValidation<Date>({
    validate,
    validators: pickValidators<Date>({
      maxDate,
      minDate,
      required,
    }),
  })

  const { input, meta } = useField<Date>(name, {
    formatOnBlur,
    initialValue,
    validate: validateFn,
    value: inputVal,
  })

  const error = useMemo(
    () =>
      meta.error && (!isEmpty(input.value) || meta.touched)
        ? getFirstError<Date>({
            allValues: values,
            label,
            maxDate,
            meta: meta as FieldState<Date>,
            minDate,
            name,
            value: input.value,
          })
        : undefined,
    [getFirstError, input.value, label, maxDate, meta, minDate, name, values],
  )

  return (
    <DateInput
      label={label}
      format={
        format ||
        (value => (value ? parseDate(value).toLocaleDateString() : ''))
      }
      locale={locale}
      required={required}
      value={input.value}
      onChange={val => {
        onChange?.(val as string | Date | undefined)
        const newDate = parseDate(val as string)
        if (isEmpty(input.value)) {
          input.onChange(newDate)

          return
        }
        const currentDate = parseDate(input.value)
        newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
        input.onChange(newDate)
      }}
      onBlur={(e: React.FocusEvent<HTMLElement, Element>) => {
        input.onBlur(e)
        onBlur?.(e)
      }}
      onFocus={(e: React.FocusEvent<HTMLElement, Element>) => {
        input.onFocus(e)
        onFocus?.(e)
      }}
      maxDate={maxDate}
      minDate={minDate}
      error={error}
      disabled={disabled}
    />
  )
}

export default DateField
