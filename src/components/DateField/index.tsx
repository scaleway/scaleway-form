import { DateInput } from '@scaleway/ui'
import { FieldState } from 'final-form'
import { ComponentProps, FocusEvent } from 'react'
import { useFormField } from '../../hooks'
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
    onBlur?: (event: FocusEvent<HTMLElement, Element>) => void
    onFocus?: (value: FocusEvent<HTMLElement, Element>) => void
    autoFocus?: boolean
  }

const parseDate = (value: Date | string): Date =>
  typeof value === 'string' ? new Date(value) : value

const isEmpty = (value?: Date | string): boolean =>
  typeof value === 'string' ? value === '' : value === undefined

export const DateField = ({
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
  autoFocus = false,
}: DateFieldProps) => {
  const { getError } = useErrors()

  const { input, meta } = useFormField<Date>(name, {
    formatOnBlur,
    initialValue,
    maxDate,
    minDate,
    required,
    validate,
    value: inputVal,
  })

  const error = getError({
    label,
    maxDate,
    meta: meta as FieldState<unknown>,
    minDate,
    name,
    value: input.value,
  })

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
      onChange={(val: string | Date | undefined) => {
        onChange?.(val)
        const newDate = parseDate(val as string)
        if (isEmpty(input.value)) {
          input.onChange(newDate)

          return
        }
        const currentDate = parseDate(input.value)
        newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
        input.onChange(newDate)
      }}
      onBlur={(e: FocusEvent<HTMLElement, Element>) => {
        input.onBlur(e)
        onBlur?.(e)
      }}
      onFocus={(e: FocusEvent<HTMLElement, Element>) => {
        input.onFocus(e)
        onFocus?.(e)
      }}
      maxDate={maxDate}
      minDate={minDate}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      name={input.name}
    />
  )
}

export default DateField
