import { SelectableCard } from '@scaleway/ui'
import { FieldState } from 'final-form'
import React, { ComponentProps } from 'react'
import { useField } from 'react-final-form'
import { pickValidators } from '../../helpers'
import { useValidation } from '../../hooks'
import { useErrors } from '../../providers/ErrorContext'
import { BaseFieldProps } from '../../types'

type SelectableCardValue = NonNullable<
  ComponentProps<typeof SelectableCard>['value']
>

type SelectableCardFieldProps<
  T = SelectableCardValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCard>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'showTick'
      | 'type'
      | 'id'
      | 'children'
      | 'name'
      | 'tooltip'
      | 'label'
    >
  > & {
    name: string
    required?: boolean
    className?: string
  }

export const SelectableCardField = ({
  name,
  value,
  onChange,
  showTick,
  type,
  disabled,
  children,
  className,
  onFocus,
  onBlur,
  required,
  validate,
  tooltip,
  id,
  label,
}: SelectableCardFieldProps): JSX.Element => {
  const { getError } = useErrors()

  const validateFn = useValidation<SelectableCardValue>({
    validate,
    validators: pickValidators({
      required,
    }),
  })

  const { input, meta } = useField(name, {
    type: type ?? 'radio',
    validate: validateFn,
    value,
  })

  const error = getError({
    label: name,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <SelectableCard
      isError={!!error}
      showTick={showTick}
      checked={input.checked}
      className={className}
      disabled={disabled}
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
      type={type}
      value={input.value}
      id={id}
      tooltip={tooltip}
      label={label}
    >
      {children}
    </SelectableCard>
  )
}
