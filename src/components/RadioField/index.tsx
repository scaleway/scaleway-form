import { Radio } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps, ReactNode, useMemo } from 'react'
import { useField, useFormState } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type RadioValue = NonNullable<ComponentProps<typeof Radio>['value']>

type RadioFieldProps<T = RadioValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Radio>,
      'disabled' | 'id' | 'onBlur' | 'onChange' | 'onFocus' | 'size' | 'value'
    >
  > & {
    children?: ReactNode
    className?: string
    label?: string
    name: string
    required?: boolean
  }

const RadioField = ({
  children,
  className,
  disabled,
  id,
  label = '',
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  size,
  validate,
  value,
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
      checked={input.checked}
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      name={input.name}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      required={required}
      size={size}
      type={input.type}
      value={input.value}
    >
      {children}
    </Radio>
  )
}

export default RadioField
