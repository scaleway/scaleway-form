import { RadioBorderedBox } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps, ReactNode } from 'react'
import { useField } from 'react-final-form'
import pickValidators from '../../helpers/pickValidators'
import useValidation from '../../hooks/useValidation'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type RadioBorderedBoxValue = NonNullable<
  ComponentProps<typeof RadioBorderedBox>['value']
>

type RadioBorderedBoxFieldProps<
  T = RadioBorderedBoxValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof RadioBorderedBox>,
      | 'badgeSize'
      | 'badgeText'
      | 'badgeVariant'
      | 'disabled'
      | 'labelDescription'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'onFocus'
    >
  > & {
    children?: ReactNode
    label: string
    name: string
    required?: boolean
  }

const RadioBorderedBoxField = ({
  badgeSize,
  badgeText,
  badgeVariant,
  children,
  disabled,
  label,
  labelDescription,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  validate,
  value,
}: RadioBorderedBoxFieldProps): JSX.Element => {
  const { getError } = useErrors()

  const validateFn = useValidation<RadioBorderedBoxValue>({
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

  const error = getError({
    label,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <RadioBorderedBox
      label={label}
      labelDescription={labelDescription}
      badgeSize={badgeSize}
      badgeText={badgeText}
      badgeVariant={badgeVariant}
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
      disabled={disabled}
      checked={input.checked}
      value={input.value}
      error={error}
    >
      {children}
    </RadioBorderedBox>
  )
}

export default RadioBorderedBoxField
