import { Radio } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, {
  ComponentProps,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  ReactNode,
  useMemo,
} from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type RadioValue = NonNullable<ComponentProps<typeof Radio>['value']>

type RadioFieldProps<T = RadioValue, K = string> = BaseFieldProps<
  T,
  K
> & {
  name: string
  label?: string
  size?: number
  valid?: boolean
  disabled?: boolean
  required?: boolean
  value: RadioValue
  id?: string
  className?: string
  children?: ReactNode
  onChange?: FormEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
}

const RadioField = ({
  validate,
  name,
  valid,
  label = '',
  size,
  disabled,
  required,
  id,
  value,
  className,
  children,
  onChange,
  onBlur,
  onFocus,
}: RadioFieldProps): JSX.Element => {
  const { values } = useFormState()
  const { getFirstError } = useErrors()

  const validateFn = useValidation<RadioValue>({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input, meta } = useField(name, {
    type: 'radio',
    validate: validateFn,
    value,
  })

  const error = useMemo(
    () =>
      meta.error
        ? getFirstError({
            allValues: values,
            label,
            meta: meta as FieldState<string | number>,
            name,
            value: input.value,
          })
        : undefined,
    [getFirstError, input.value, label, meta, name, values],
  )

  return (
    <Radio
      name={input.name}
      onChange={(event: FormEvent<HTMLInputElement>) => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      type={input.type}
      size={size}
      disabled={disabled}
      required={required}
      checked={input.checked}
      value={input.value}
      id={id}
      error={error}
      valid={valid}
      className={className}
    >
      {children}
    </Radio>
  )
}

export default RadioField
